import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { GeoTypeService } from './geo-type.service';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from 'ng2-translate/src/translate.service';
import { AppState } from '../../../../../../app/reducers/index';

@Component({
  selector:        'fba-geo-type',
  templateUrl:     'geo-type.component.html',
  styleUrls:       ['geo-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTypeComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  model$;

  toggleDropdown (isOpen, event?) {
    if (event) {
      event.stopPropagation();
    }

    this.geoTypeService.toggleSearchTypeDropdown(isOpen);
  }

  selectType (type) {
    this.geoTypeService.selectSearchType(type);
    this.toggleDropdown(false);
  }

  constructor (private _store: Store<AppState>,
               private geoTypeService: GeoTypeService,
               private translateService: TranslateService) {
    this.model$ = this._store.let(this.geoTypeService.getModel);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    /**
     * Set defaults on init
     */
    this.geoTypeService.setTranslatedSearchType();

    /**
     * Translate types when language change
     */
    this.translateService.onLangChange
        .takeUntil(this.destroy$)
        .subscribe(() => this.geoTypeService.setTranslatedSearchType());
  }

}
