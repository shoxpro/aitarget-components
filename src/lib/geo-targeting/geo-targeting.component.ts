import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
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
import { isExceedLimit, getIsWithinLimitObject } from './geo-targeting.constants';
import { SdkError } from '../shared/errors/sdkError';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector:        'geo-targeting',
  templateUrl:     './geo-targeting.component.html',
  styleUrls:       ['./geo-targeting.component.scss'],
  providers:       [
    {
      provide:     NG_VALUE_ACCESSOR,
      useExisting: GeoTargetingComponent,
      multi:       true
    },
    GeoTargetingActions, GeoTargetingService, GeoTargetingApiService, GeoTargetingDropdownService,
    GeoTargetingSelectedActions, TargetingSpecService,
    GeoTargetingInfoService, GeoTargetingInfoActions, GeoTargetingLocationTypeService,
    GeoTargetingLocationTypeActions, GeoTargetingTypeService,
    GeoTargetingRadiusService, GeoTargetingSelectedService,
    GeoTargetingMapService, ComponentsHelperService, GeoTargetingTypeActions,
    GeoTargetingSearchActions, GeoTargetingIdService,
    GeoTargetingSearchService, GeoTargetingModeService, GeoTargetingModeActions
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingComponent implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {
  destroy$ = new Subject();
  clickOutsideOfComponent$;
  modelSelected$;

  id;

  // ==== value ====
  _value: TargetingSpec = {};

  set value (value: any) {
    this._value = value || this._value;

    this.propagateChange(this._value);
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  get value () {
    return this._value;
  }

  // ==== value ====

  // noinspection JSMethodCanBeStatic
  /**
   * Will be replaced when implementing registerOnChange
   * @param _ {TargetingSpec}
   */
  propagateChange (_: TargetingSpec) { return _; }

  constructor (private _store: Store<AppState>,
               private translateService: TranslateService,
               private geoTargetingApiService: GeoTargetingApiService,
               private geoTargetingSelectedService: GeoTargetingSelectedService,
               private geoTargetingLocationTypeService: GeoTargetingLocationTypeService,
               private geoTargetingService: GeoTargetingService,
               private geoTargetingInfoService: GeoTargetingInfoService,
               private geoTargetingSearchService: GeoTargetingSearchService,
               private geoTargetingIdService: GeoTargetingIdService,
               private geoTargetingModeService: GeoTargetingModeService,
               private changeDetectorRef: ChangeDetectorRef) {
    this.modelSelected$           = this._store.let(this.geoTargetingSelectedService.getModel);
    this.clickOutsideOfComponent$ = this.geoTargetingService.clickOutsideOfComponent$;
    this.id                       = this.geoTargetingIdService.id$.getValue();
  }

  // ==== implement ControlValueAccessor ====
  writeValue (value: TargetingSpec) {
    this._value = value || this._value;
  }

  registerOnChange (fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched () {}

  // ==== implement ControlValueAccessor ====

  // noinspection JSUnusedGlobalSymbols
  ngAfterViewInit () {
    /**
     * Set location types on init
     */
    if (this.value.geo_locations && this.value.geo_locations.location_types) {
      this.geoTargetingLocationTypeService.selectTypeByValue(this.value.geo_locations.location_types);
    }
    /**
     * Get geo location metadata for passed targeting spec and update selected items
     */
    this.geoTargetingSearchService.fetching(true);
    this.geoTargetingApiService
        .getSelectedLocationItems(this.value)
        .subscribe({
          next:     (items: GeoTargetingItem[]) => {
            if (items.length) {
              this.geoTargetingSelectedService.setItems(items);
            }
          },
          error:    (error) => {
            if (error instanceof SdkError) {
              this.geoTargetingInfoService.showInfo({level: 'error', message: error.message});
            }
          },
          complete: () => {
            this.geoTargetingSearchService.fetching(false);
            this.changeDetectorRef.markForCheck();
            this.changeDetectorRef.detectChanges();
          }
        });
  }

  ngOnDestroy () {
    this.destroy$.next();
    this.geoTargetingService.destroy();
  }

  ngOnInit () {
    /**
     * Init new geo component under new unique id
     */
    this.geoTargetingService.init();

    /**
     * Update all mode components at once
     */
    this.geoTargetingModeService.setTranslatedModes();

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
              .filter((spec: TargetingSpec) => {
                if (isExceedLimit(spec)) {
                  this.geoTargetingService.processOverLimit(getIsWithinLimitObject(spec));
                  return false;
                } else {
                  return true;
                }
              })
              .subscribe((spec: TargetingSpec) => {
                this.value = Object.assign({}, this.value, spec);
              });

    /**
     * Update selected items when language change
     */
    this.translateService.onLangChange
        .takeUntil(this.destroy$)
        .do(() => this.geoTargetingSearchService.fetching(true))
        .subscribe(() => {
          this.geoTargetingApiService
              .getSelectedLocationItems(this.value)
              .subscribe({
                next:     (items: GeoTargetingItem[]) => {
                  this.geoTargetingSelectedService.updateItems(items);
                },
                error:    (error) => {
                  if (error instanceof SdkError) {
                    this.geoTargetingInfoService.showInfo({level: 'error', message: error.message});
                  }
                },
                complete: () => {
                  this.geoTargetingSearchService.fetching(false);
                  this.changeDetectorRef.markForCheck();
                  this.changeDetectorRef.detectChanges();
                }
              });

          this.geoTargetingModeService.setTranslatedModes();
        });
  }

}
