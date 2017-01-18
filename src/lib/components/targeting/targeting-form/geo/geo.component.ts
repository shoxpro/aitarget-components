import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GeoApiService } from './geo-api/geo-api.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { TargetingSpec } from '../../interfaces/targeting-spec.interface';
import { GeoDropdownService } from './geo-dropdown/geo-dropdown.service';
import { GeoItem } from './geo-item.interface';
import { GeoModeService } from './geo-mode/geo-mode.service';
import { GeoInfoService } from './geo-info/geo-info.service';
import { GeoLocationTypeService } from './geo-location-type/geo-location-type.service';
import { GeoRadiusService } from './geo-radius/geo-radius.service';
import { GeoMapService } from './geo-map/geo-map.service';
import { ComponentsHelperService } from '../../../../shared/services/components-helper.service';
import { GeoService } from './geo.service';
import { GeoSearchActions } from './geo-search/geo-search.actions';
import { GeoSearchService } from './geo-search/geo-search.service';
import { GeoModeActions } from './geo-mode/geo-mode.actions';
import { GeoSelectedActions } from './geo-selected/geo-selected.actions';
import { GeoLocationTypeActions } from './geo-location-type/geo-location-type.actions';
import { GeoInfoActions } from './geo-info/geo-info.actions';
import { GeoSelectedService } from './geo-selected/geo-selected.service';
import { Store } from '@ngrx/store';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { GeoTypeActions } from './geo-type/geo-type.actions';
import { GeoIdService } from './geo.id';
import { GeoActions } from './geo.actions';
import { GeoTypeService } from './geo-type/geo-type.service';
import { isExceedLimit, getIsWithinLimitObject } from './geo.constants';
import { SdkError } from '../../../../shared/errors/sdkError';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SqueezedValueAccessor } from '../../../../shared/interfaces';
import { FormControlToken } from '../../../../shared/constants/form-control-token';
import { AppState } from '../../../../../app/reducers/index';

@Component({
  selector:        'fba-geo',
  templateUrl:     'geo.component.html',
  styleUrls:       ['geo.component.scss'],
  providers:       [
    {
      provide:     NG_VALUE_ACCESSOR,
      useExisting: GeoComponent,
      multi:       true
    },
    {provide: FormControlToken, useExisting: GeoComponent},
    GeoActions, GeoService, GeoApiService, GeoDropdownService,
    GeoSelectedActions,
    GeoInfoService, GeoInfoActions, GeoLocationTypeService,
    GeoLocationTypeActions, GeoTypeService,
    GeoRadiusService, GeoSelectedService,
    GeoMapService, ComponentsHelperService, GeoTypeActions,
    GeoSearchActions, GeoIdService,
    GeoSearchService, GeoModeService, GeoModeActions
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoComponent implements ControlValueAccessor, SqueezedValueAccessor, OnInit, OnDestroy {
  destroy$       = new Subject();
  squeezedValue$ = new BehaviorSubject('–');
  clickOutsideOfComponent$;
  modelSelected$;

  id;

  // ==== value ====
  _value: TargetingSpec = {};

  set value (value: any) {
    this._value = value || this._value;

    this.propagateChange(this._value);
    this.updateSqueezedValue();
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
               private geoApiService: GeoApiService,
               private geoSelectedService: GeoSelectedService,
               private geoLocationTypeService: GeoLocationTypeService,
               private geoService: GeoService,
               private geoInfoService: GeoInfoService,
               private geoSearchService: GeoSearchService,
               private geoIdService: GeoIdService,
               private geoModeService: GeoModeService,
               private changeDetectorRef: ChangeDetectorRef) {
    this.modelSelected$           = this._store.let(this.geoSelectedService.getModel);
    this.clickOutsideOfComponent$ = this.geoService.clickOutsideOfComponent$;
    this.id                       = this.geoIdService.id$.getValue();
  }

  // ==== implement ControlValueAccessor ====
  writeValue (value: TargetingSpec) {
    this._value = value || this._value;
    this.updateView();
  }

  registerOnChange (fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched () {}

  // ==== implement ControlValueAccessor ====

  // ==== implement SqueezedValueAccessor ====

  updateSqueezedValue () {
    this.modelSelected$
        .take(1)
        .map(({items}) => {
          return items.reduce((acc, item) => {
            acc += `<span style="display: inline-flex">
                      <fba-geo-pin [excluded]="${item.excluded} === true"
                      style="display: inline-block"></fba-geo-pin>
                      <span>${item.name}</span>
                    </span>`;

            return acc;
          }, '');
        })
        .subscribe((value) => {
          this.squeezedValue$.next(value || '–');
        });
  }

  getSqueezedValue () {
    return this.squeezedValue$.getValue();
  }

  focus () {
    this.geoSearchService.focus();
  }

  // ==== implement SqueezedValueAccessor ====
  /**
   * Get geo location metadata for passed targeting spec and update selected items
   */
  getSelectedLocationItems () {
    // Toggle search preloader
    const fetching = (isFetching) => {
      this.geoSearchService.fetching(isFetching);
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    };

    fetching(true);

    this.geoApiService
        .getSelectedLocationItems(this.value)
        .subscribe({
          next:     (items: GeoItem[]) => {
            this.geoSelectedService.setItems(items);
            this.updateSqueezedValue();
          },
          error:    (error) => {
            if (error instanceof SdkError) {
              this.geoInfoService.showInfo({level: 'error', message: error.message});
            }

            fetching(false);
          },
          complete: () => {
            fetching(false);
          }
        });
  }

  updateView () {
    /**
     * Set location types on init
     */
    if (this.value.geo_locations && this.value.geo_locations.location_types) {
      this.geoLocationTypeService.selectTypeByValue(this.value.geo_locations.location_types);
    }

    this.getSelectedLocationItems();
  }

  ngOnDestroy () {
    this.destroy$.next();
    this.geoService.destroy();
  }

  ngOnInit () {
    /**
     * Init new geo component under new unique id
     */
    this.geoService.init();

    /**
     * Update all mode components at once
     */
    this.geoModeService.setTranslatedModes();

    /**
     * Subscribe for changes in selected items and update targeting spec when changed
     */
    Observable.merge(
      this.modelSelected$
          .skip(2)
          .map(({items}) => items)
          .distinctUntilChanged(),
      this._store.let(this.geoLocationTypeService.getModel)
          .skip(3)
          .map(({selectedType}) => selectedType)
          .filter((selectedType) => Boolean(selectedType))
          .distinctUntilChanged()
    )
              .takeUntil(this.destroy$)
              .switchMap(() => this.geoSelectedService.getSpec())
              .filter((spec: TargetingSpec) => {
                if (isExceedLimit(spec)) {
                  this.geoService.processOverLimit(getIsWithinLimitObject(spec));
                  return false;
                } else {
                  return true;
                }
              })
              .subscribe((spec: TargetingSpec) => {
                this.value = spec;
              });

    /**
     * Update selected items when language change
     */
    this.translateService.onLangChange
        .takeUntil(this.destroy$)
        .subscribe(() => {
          this.getSelectedLocationItems();
          this.geoModeService.setTranslatedModes();
        });
  }

}
