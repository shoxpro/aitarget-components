import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoLocationTypeService } from './geo-location-type.service';
import { AppState } from '../../../../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Rx';

@Component({
  selector:        'fba-geo-location-type',
  templateUrl:     'geo-location-type.component.html',
  styleUrls:       ['geo-location-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoLocationTypeComponent implements OnInit, OnDestroy {

  model$;
  destroy$ = new Subject();

  /**
   * Toggle Dropdown
   */
  toggleDropdown (event?) {
    if (event) {
      event.stopPropagation();
    }
    this.geoLocationTypeService.toggleTypeDropdown();
  }

  /**
   * Show info for passed type from dropdown
   * @param type
   */
  showInfo (type) {
    this.geoLocationTypeService.showInfoForType(type);
  }

  /**
   * Select type from dropdown
   * @param type
   */
  selectType (type) {
    // TODO: Should update targeting spec on select
    this.geoLocationTypeService.selectType(type);
    this.geoLocationTypeService.toggleTypeDropdown(false);
  }

  constructor (private _store: Store<AppState>,
               private geoLocationTypeService: GeoLocationTypeService,
               private translateService: TranslateService) {
    this.model$ = this._store.let(this.geoLocationTypeService.getModel);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    // TODO: Add Key navigation

    // Set types on init
    this.geoLocationTypeService.setTranslatedTypes();

    // Update types and selectedType when language change
    this.translateService.onLangChange
        .takeUntil(this.destroy$)
        .subscribe(() => {
          this.geoLocationTypeService.setTranslatedTypes();
        });
  }

}
