import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GeoTargetingApiService } from './geo-targeting-api/geo-targeting-api.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { TargetingSpec } from '../targeting/targeting-spec.interface';
import { GeoTargetingDropdownService } from './geo-targeting-dropdown/geo-targeting-dropdown.service';
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
import { GeoTargetingInfoActions } from './geo-targeting-info/geo-targeting-info.actions';
import { GeoTargetingSelectedService } from './geo-targeting-selected/geo-targeting-selected.service';
import { AppState } from '../../app/reducers/index';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { GeoTargetingTypeActions } from './geo-targeting-type/geo-targeting-type.actions';
import { GeoTargetingIdService } from './geo-targeting.id';
import { GeoTargetingActions } from './geo-targeting.actions';
import { GeoTargetingTypeService } from './geo-targeting-type/geo-targeting-type.service';

@Component({
  selector:    'geo-targeting',
  templateUrl: './geo-targeting.component.html',
  styleUrls:   ['./geo-targeting.component.scss'],
  providers:   [GeoTargetingActions, GeoTargetingService, GeoTargetingApiService, GeoTargetingDropdownService,
    GeoTargetingSelectedActions, TargetingSpecService, GeoTargetingModeService,
    GeoTargetingInfoService, GeoTargetingInfoActions, GeoTargetingLocationTypeService,
    GeoTargetingLocationTypeActions, GeoTargetingTypeService,
    GeoTargetingRadiusService, GeoTargetingSelectedService,
    GeoTargetingMapService, ComponentsHelperService, GeoTargetingTypeActions,
    GeoTargetingSearchActions, GeoTargetingIdService,
    GeoTargetingSearchService, GeoTargetingModeService, GeoTargetingModeActions]
})
export class GeoTargetingComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  modelSelected$;

  _defaultLang: string = 'en_US';
  _lang: string        = this._defaultLang;

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

  constructor (private _store: Store<AppState>,
               private translateService: TranslateService,
               private geoTargetingApiService: GeoTargetingApiService,
               private geoTargetingSelectedService: GeoTargetingSelectedService,
               private geoTargetingLocationTypeService: GeoTargetingLocationTypeService,
               private geoTargetingService: GeoTargetingService,
               private geoTargetingModeService: GeoTargetingModeService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang(this.lang);
    this.modelSelected$ = this._store.let(this.geoTargetingSelectedService.getModel);
  }

  ngOnDestroy () {
    this.destroy$.next();
    this.geoTargetingService.destroy();
  }

  ngOnInit () {

    this.geoTargetingService.init();

    this.geoTargetingModeService.setTranslatedModes();

    if (this.spec.geo_locations && this.spec.geo_locations.location_types) {
      this.geoTargetingLocationTypeService.selectTypeByValue(this.spec.geo_locations.location_types);
    }
    /**
     * Get geo location metadata for passed targeting spec and update selected items
     */
    this.geoTargetingApiService
        .getSelectedLocationItems(this.spec)
        .subscribe((items: GeoTargetingItem[]) => {
          this.geoTargetingSelectedService.setItems(items);
        });

    /**
     * Subscribe for changes in selected items and update targeting spec when changed
     */
    Observable.merge(
      this.modelSelected$
          .map(({items}) => items)
          .distinctUntilChanged(),
      this._store.let(this.geoTargetingLocationTypeService.getModel)
          .map(({selectedType}) => selectedType)
          .filter((selectedType) => Boolean(selectedType))
          .distinctUntilChanged()
    )
              .takeUntil(this.destroy$)
              .switchMap(() => this.geoTargetingSelectedService.getSpec())
              .subscribe((spec: TargetingSpec) => {
                let newTargetingSpec = Object.assign({}, this.spec, spec);
                this.onChange(newTargetingSpec);
              });

    /**
     * Update selected items when language change
     */
    this.translateService.onLangChange
        .takeUntil(this.destroy$)

        .subscribe(() => {
          this.geoTargetingApiService
              .getSelectedLocationItems(this.spec)
              .subscribe((items: GeoTargetingItem[]) => {
                this.geoTargetingSelectedService.updateItems(items);
              });

          this.geoTargetingModeService.setTranslatedModes();
        });
  }

}
