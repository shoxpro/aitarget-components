import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GeoTargetingApiService } from './geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingInputService } from './geo-targeting-input/geo-targeting-input.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { TargetingSpec } from '../targeting/targeting-spec.interface';
import { GeoTargetingDropdownService } from './geo-targeting-dropdown/geo-targeting-dropdown.service';
import { GeoTargetingSelectedService } from './geo-targeting-selected/geo-targeting-selected.service';
import { TargetingSpecService } from '../targeting/targeting-spec.service';
import { GeoTargetingItem } from './geo-targeting-item.interface';
import { GeoTargetingModeService } from './geo-targeting-mode/geo-targeting-mode.service';
import { GeoTargetingInfoService } from './geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingLocationTypeService } from './geo-targeting-location-type/geo-targeting-location-type.service';
import { GeoTargetingRadiusService } from './geo-targeting-radius/geo-targeting-radius.service';
import { GeoTargetingMapService } from './geo-targeting-map/geo-targeting-map.service';
import { ComponentsHelperService } from '../shared/services/components-helper.service';
import { GeoTargetingService } from './geo-targeting.service';
import { GeoTargetingSearchActions } from './geo-targeting-search/geo-targeting-search.actions';
import { GeoTargetingSearchService } from './geo-targeting-search/geo-targeting-search.service';
import { GeoTargetingModeActions } from './geo-targeting-mode/geo-targeting-mode.actions';
import { GeoTargetingSelectedActions } from './geo-targeting-selected/geo-targeting-selected.actions';
import { GeoTargetingLocationTypeActions } from './geo-targeting-location-type/geo-targeting-location-type.actions';

@Component({
  selector:    'geo-targeting',
  templateUrl: './geo-targeting.component.html',
  styleUrls:   ['./geo-targeting.component.css'],
  providers:   [GeoTargetingService, GeoTargetingApiService, GeoTargetingInputService, GeoTargetingDropdownService,
    GeoTargetingSelectedService, GeoTargetingSelectedActions, TargetingSpecService, GeoTargetingModeService,
    GeoTargetingInfoService, GeoTargetingLocationTypeService, GeoTargetingLocationTypeActions,
    GeoTargetingRadiusService,
    GeoTargetingMapService, ComponentsHelperService, GeoTargetingLocationTypeService, GeoTargetingSearchActions,
    GeoTargetingSearchService, GeoTargetingModeService, GeoTargetingModeActions]
})
export class GeoTargetingComponent implements OnInit, OnDestroy {

  _defaultLang: string = 'en_US';
  _lang: string        = this._defaultLang;
  _subscriptions       = [];

  @Input('adaccountId') adaccountId: string;
  @Input('spec') spec: TargetingSpec    = {};
  @Input('onChange') onChange: Function = (spec?) => spec;

  @Input('lang')
  set lang (lang: string) {
    this._lang = lang || this._defaultLang;
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translateService.use(this.lang);
  }

  get lang () {
    return this._lang;
  }

  constructor (private translateService: TranslateService,
               private geoTargetingApiService: GeoTargetingApiService,
               private targetingSpecService: TargetingSpecService,
               private geoTargetingSelectedService: GeoTargetingSelectedService,
               private geoTargetingTypeService: GeoTargetingLocationTypeService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang(this.lang);
  }

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    if (this.spec.geo_locations && this.spec.geo_locations.location_types) {
      this.geoTargetingTypeService.selectTypeByValue(this.spec.geo_locations.location_types);
    }
    /**
     * Get geo location metadata for passed targeting spec and update selected items
     */
    this._subscriptions.push(
      this.geoTargetingApiService
          .getSelectedLocationItems(this.spec)
          .subscribe((items: GeoTargetingItem[]) => {
            this.geoTargetingSelectedService.update(items);
          })
    );

    /**
     * Subscribe for changes in selected items and update targeting spec when changed
     */
    this._subscriptions.push(
      this.geoTargetingSelectedService.items
      // Skip initialization update and update for first passed targeting spec
          .skip(2)
          .subscribe(() => {
            let newTargetingSpec = Object.assign(this.spec, this.geoTargetingSelectedService.getSpec());
            this.targetingSpecService.update(newTargetingSpec);
          })
    );

    /**
     * Subscribe for targeting spec changes and if differ from previous,
     * trigger onChange handler
     */
    this._subscriptions.push(
      this.targetingSpecService.spec
      // Skip initialization update
          .skip(1)
          .subscribe((spec: TargetingSpec) => {
            this.onChange(spec);
          })
    );

    /**
     * Update selected items when language change
     */
    this._subscriptions.push(
      this.translateService.onLangChange.subscribe(() => {
        this.geoTargetingApiService
            .getSelectedLocationItems(this.spec)
            .subscribe((items: GeoTargetingItem[]) => {
              this.geoTargetingSelectedService.update(items);
            });
      })
    );
  }

}
