import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { LibState } from '../../lib-state.interface';
import { Store } from '@ngrx/store';
import { TOGGLE_SEARCH_TYPE_DROPDOWN, SELECT_SEARCH_TYPE, TRANSLATE_SEARCH_TYPES } from './geo-targeting-type.actions';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { typeModel } from './geo-targeting-type.model';

@Component({
  selector:        'geo-targeting-type',
  templateUrl:     './geo-targeting-type.component.html',
  styleUrls:       ['./geo-targeting-type.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingTypeComponent implements OnInit, OnDestroy {

  private _subscriptions = [];
  private model;

  public toggleDropdown (isOpen, event?) {
    if (event) {
      event.stopPropagation();
    }
    this._store.dispatch({type: TOGGLE_SEARCH_TYPE_DROPDOWN, payload: {isOpen: isOpen}});
  }

  public selectType (type) {
    this._store.dispatch({type: SELECT_SEARCH_TYPE, payload: {selectedType: type}});
    this.toggleDropdown(false);
  }

  constructor (private _store: Store<LibState>,
               private TranslateService: TranslateService) {
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
    this._store.dispatch({type: TRANSLATE_SEARCH_TYPES, payload: {translateService: this.TranslateService}});

    /**
     * Translate types when language change
     */
    this._subscriptions.push(
      this.TranslateService.onLangChange.subscribe(() => {
        this._store.dispatch({type: TRANSLATE_SEARCH_TYPES, payload: {translateService: this.TranslateService}});
      })
    );
  }

}
