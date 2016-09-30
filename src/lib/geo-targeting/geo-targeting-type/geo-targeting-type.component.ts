import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingTypeService } from './geo-targeting-type.service';
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
  selector:        'geo-targeting-type',
  templateUrl:     './geo-targeting-type.component.html',
  styleUrls:       ['./geo-targeting-type.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingTypeComponent implements OnInit, OnDestroy {

  private _subscriptions  = [];
  private types: Type[];
  private selectedType: Type;
  private isOpen: boolean = false;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  /**
   * Set types to choose from
   */
  private setTypes = () => {
    this.types = [
      {
        title: this.TranslateService.instant(`geo-targeting-type.ALL`),
        info:  this.TranslateService.instant(`geo-targeting-type.ALL_INFO`),
        value: ['home', 'recent']
      },
      {
        title: this.TranslateService.instant(`geo-targeting-type.HOME`),
        info:  this.TranslateService.instant(`geo-targeting-type.HOME_INFO`),
        value: ['home']
      },
      {
        title: this.TranslateService.instant(`geo-targeting-type.RECENT`),
        info:  this.TranslateService.instant(`geo-targeting-type.RECENT_INFO`),
        value: ['recent']
      },
      {
        title: this.TranslateService.instant(`geo-targeting-type.TRAVEL_IN`),
        info:  this.TranslateService.instant(`geo-targeting-type.TRAVEL_IN_INFO`),
        value: ['travel_in']
      },
    ];
  };

  /**
   * Toggle Dropdown
   */
  public toggleDropdown (event?) {
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
  public toggleInfo (type, showInfo) {
    type.showInfo = showInfo;
    this.updateTemplate();
  }

  /**
   * Select type from dropdown
   * @param type
   */
  public select (type) {
    this.GeoTargetingTypeService.update(type.value);

    // Update targeting spec
    let newTargetingSpec = Object.assign(this.TargetingSpecService.get(), this.GeoTargetingSelectedService.getSpec());
    this.TargetingSpecService.update(newTargetingSpec);

    // Hide info and close dropdown
    this.toggleInfo(type, false);
    this.toggleDropdown();
  }

  constructor (private ChangeDetectorRef: ChangeDetectorRef,
               private TranslateService: TranslateService,
               private GeoTargetingTypeService: GeoTargetingTypeService,
               private GeoTargetingSelectedService: GeoTargetingSelectedService,
               private TargetingSpecService: TargetingSpecService) {}

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    // Set types on init
    this.setTypes();

    this._subscriptions.push(
      this.GeoTargetingTypeService.type.subscribe((selectedTypeValue: LocationType[]) => {
        this.selectedType = this.types.filter((type) => {
          return type.value.join() === selectedTypeValue.join();
        })[0];

        this.updateTemplate();
      })
    );

    this._subscriptions.push(
      this.TranslateService.onLangChange.subscribe(() => {
        // Update types and selectedType when language change
        this.setTypes();
        this.GeoTargetingTypeService.update(this.selectedType.value);

        this.updateTemplate();
      })
    );
  }

}
