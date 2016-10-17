import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingTypeService } from './geo-targeting-location-type.service';
import { LocationType } from '../../targeting/targeting-spec-geo.interface';
import { TargetingSpecService } from '../../targeting/targeting-spec.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';

interface Type {
  title: string;
  info: string;
  showInfo?: boolean;
  value: LocationType[];
}

@Component({
  selector:        'geo-targeting-location-type',
  templateUrl:     './geo-targeting-location-type.component.html',
  styleUrls:       ['./geo-targeting-location-type.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingLocationTypeComponent implements OnInit, OnDestroy {

  _subscriptions  = [];
  types: Type[];
  selectedType: Type;
  isOpen: boolean = false;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Set types to choose from
   */
  setTypes = () => {
    this.types = [
      {
        title: this.translateService.instant(`geo-targeting-type.ALL`),
        info:  this.translateService.instant(`geo-targeting-type.ALL_INFO`),
        value: ['home', 'recent']
      },
      {
        title: this.translateService.instant(`geo-targeting-type.HOME`),
        info:  this.translateService.instant(`geo-targeting-type.HOME_INFO`),
        value: ['home']
      },
      {
        title: this.translateService.instant(`geo-targeting-type.RECENT`),
        info:  this.translateService.instant(`geo-targeting-type.RECENT_INFO`),
        value: ['recent']
      },
      {
        title: this.translateService.instant(`geo-targeting-type.TRAVEL_IN`),
        info:  this.translateService.instant(`geo-targeting-type.TRAVEL_IN_INFO`),
        value: ['travel_in']
      },
    ];
  };

  /**
   * Toggle Dropdown
   */
  toggleDropdown (event?) {
    if (event) {
      event.stopPropagation();
    }
    this.isOpen = !this.isOpen;
    this.updateTemplate();
  }

  /**
   * Toggle info for types from dropdown
   * @param type
   * @param showInfo
   */
  toggleInfo (type, showInfo) {
    type.showInfo = showInfo;
    this.updateTemplate();
  }

  /**
   * Select type from dropdown
   * @param type
   */
  select (type) {
    this.geoTargetingTypeService.update(type.value);

    // Update targeting spec
    let newTargetingSpec = Object.assign(this.targetingSpecService.get(), this.geoTargetingSelectedService.getSpec());
    this.targetingSpecService.update(newTargetingSpec);

    // Hide info and close dropdown
    this.toggleInfo(type, false);
    this.toggleDropdown();
  }

  constructor (private changeDetectorRef: ChangeDetectorRef,
               private translateService: TranslateService,
               private geoTargetingTypeService: GeoTargetingTypeService,
               private geoTargetingSelectedService: GeoTargetingSelectedService,
               private targetingSpecService: TargetingSpecService) {}

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    // Set types on init
    this.setTypes();

    this._subscriptions.push(
      this.geoTargetingTypeService.type.subscribe((selectedTypeValue: LocationType[]) => {
        this.selectedType = this.types.filter((type) => {
          return type.value.join() === selectedTypeValue.join();
        })[0];

        this.updateTemplate();
      })
    );

    this._subscriptions.push(
      this.translateService.onLangChange.subscribe(() => {
        // Update types and selectedType when language change
        this.setTypes();
        this.geoTargetingTypeService.update(this.selectedType.value);

        this.updateTemplate();
      })
    );
  }

}
