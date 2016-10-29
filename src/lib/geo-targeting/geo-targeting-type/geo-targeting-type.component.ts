import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TOGGLE_SEARCH_TYPE_DROPDOWN, SELECT_SEARCH_TYPE, TRANSLATE_SEARCH_TYPES } from './geo-targeting-type.actions';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { typeModel } from './geo-targeting-type.model';
import { AppState } from '../../../app/reducers/index';

@Component({
  selector:        'geo-targeting-type',
  templateUrl:     './geo-targeting-type.component.html',
  styleUrls:       ['./geo-targeting-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingTypeComponent implements OnInit, OnDestroy {

  _subscriptions = [];
  model;

  toggleDropdown (isOpen, event?) {
    if (event) {
      event.stopPropagation();
    }
    this._store.dispatch({type: TOGGLE_SEARCH_TYPE_DROPDOWN, payload: {isOpen: isOpen}});
  }

  selectType (type) {
    this._store.dispatch({type: SELECT_SEARCH_TYPE, payload: {selectedType: type}});
    this.toggleDropdown(false);
  }

  constructor (private _store: Store<AppState>,
               private translateService: TranslateService) {
    this.model = _store.let(typeModel);
  }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    /**
     * Translate types on init
     */
    this._store.dispatch({type: TRANSLATE_SEARCH_TYPES, payload: {translateService: this.translateService}});

    /**
     * Translate types when language change
     */
    this._subscriptions.push(
      this.translateService.onLangChange.subscribe(() => {
        this._store.dispatch({type: TRANSLATE_SEARCH_TYPES, payload: {translateService: this.translateService}});
      })
    );
  }

}
