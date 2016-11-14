import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/reducers/index';
import { GeoTargetingTypeService } from './geo-targeting-type.service';
import { Subject } from 'rxjs';
import { TranslateService } from 'ng2-translate';

@Component({
  selector:        'geo-targeting-type',
  templateUrl:     './geo-targeting-type.component.html',
  styleUrls:       ['./geo-targeting-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingTypeComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  model$;

  toggleDropdown (isOpen, event?) {
    if (event) {
      event.stopPropagation();
    }

    this.geoTargetingTypeService.toggleSearchTypeDropdown(isOpen);
  }

  selectType (type) {
    this.geoTargetingTypeService.selectSearchType(type);
    this.toggleDropdown(false);
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingTypeService: GeoTargetingTypeService,
               private translateService: TranslateService) {
    this.model$ = this._store.let(this.geoTargetingTypeService.getModel);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    /**
     * Set defaults on init
     */
    this.geoTargetingTypeService.setTranslatedSearchType();

    /**
     * Translate types when language change
     */
    this.translateService.onLangChange
        .takeUntil(this.destroy$)
        .subscribe(() => this.geoTargetingTypeService.setTranslatedSearchType());
  }

}
