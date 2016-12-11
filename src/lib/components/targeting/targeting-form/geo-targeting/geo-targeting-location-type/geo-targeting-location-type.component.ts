import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingLocationTypeService } from './geo-targeting-location-type.service';
import { AppState } from '../../../../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Rx';

@Component({
  selector:        'geo-targeting-location-type',
  templateUrl:     'geo-targeting-location-type.component.html',
  styleUrls:       ['geo-targeting-location-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingLocationTypeComponent implements OnInit, OnDestroy {

  model$;
  destroy$ = new Subject();

  /**
   * Toggle Dropdown
   */
  toggleDropdown (event?) {
    if (event) {
      event.stopPropagation();
    }
    this.geoTargetingLocationTypeService.toggleTypeDropdown();
  }

  /**
   * Show info for passed type from dropdown
   * @param type
   */
  showInfo (type) {
    this.geoTargetingLocationTypeService.showInfoForType(type);
  }

  /**
   * Select type from dropdown
   * @param type
   */
  selectType (type) {
    // TODO: Should update targeting spec on select
    this.geoTargetingLocationTypeService.selectType(type);
    this.geoTargetingLocationTypeService.toggleTypeDropdown(false);
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingLocationTypeService: GeoTargetingLocationTypeService,
               private translateService: TranslateService) {
    this.model$ = this._store.let(this.geoTargetingLocationTypeService.getModel);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    // TODO: Add Key navigation

    // Set types on init
    this.geoTargetingLocationTypeService.setTranslatedTypes();

    // Update types and selectedType when language change
    this.translateService.onLangChange
        .takeUntil(this.destroy$)
        .subscribe(() => {
          this.geoTargetingLocationTypeService.setTranslatedTypes();
        });
  }

}
