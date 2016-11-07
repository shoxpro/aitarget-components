import { Injectable } from '@angular/core';
import { GeoTargetingSearchActions } from './geo-targeting-search.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/reducers/index';
import { Observable } from 'rxjs/Rx';
import {
  GeoTargetingSearchState, GEO_TARGETING_SEARCH_KEY, geoTargetingSearchInitial
} from './geo-taregting-search.reducer';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { TranslateService } from 'ng2-translate';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service.new';
import { GEO_TARGETING_STATE_KEY, GeoTargetingState } from '../geo-targeting.reducer';

@Injectable()
export class GeoTargetingSearchService {
  model$;

  static getModel = (_store): Observable<GeoTargetingSearchState> => {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geoTargetingState: GeoTargetingState) => geoTargetingState[GEO_TARGETING_SEARCH_KEY])
                 .distinctUntilChanged();
  };

  focus () {
    this._store.dispatch(this.geoTargetingSearchActions.updateModel({hasFocus: true}));
  }

  blur () {
    this._store.dispatch(this.geoTargetingSearchActions.updateModel({hasFocus: false}));
  }

  toggleDropdown (toOpen: boolean) {
    this.model$
        .take(1)
        .subscribe((model) => {
          // Open dropdown only for single search and if there are items to show
          let isDropdownOpen = Boolean(toOpen && model.items.length && model.terms.length === 1);
          this._store.dispatch(this.geoTargetingSearchActions.updateModel({isDropdownOpen}));
        });
  }

  toggleMap (isMapOpen: boolean) {
    this._store.dispatch(this.geoTargetingSearchActions.updateModel({isMapOpen}));
  }

  setInput (inputValue) {
    this._store.dispatch(this.geoTargetingSearchActions.updateModel(
      Object.assign({}, geoTargetingSearchInitial, {inputValue, hasFocus: true})
    ));
  }

  /**
   * Reset to initial but remain focus
   */
  reset () {
    this._store.dispatch(this.geoTargetingSearchActions.updateModel(
      Object.assign({}, geoTargetingSearchInitial, {hasFocus: true})
    ));
  }

  informAboutNotFoundTerms (model: GeoTargetingSearchState) {
    if (!model.termsNotFound.length) {
      this.geoTargetingInfoService.hideInfo();
      return;
    }

    const notFoundInputs    = model.termsNotFound.map((term) => term.input);
    const notFoundInputsStr = notFoundInputs.join(', ');

    let message = this.translateService.instant(
      `geo-targeting-info.MESSAGE_NOT_FOUND`,
      {notFoundInputsStr}
    );

    this.geoTargetingInfoService.showInfo({message});
  }

  selectFoundTerms (model: GeoTargetingSearchState) {
    let matchedItems = model.termsMatches.map((term) => term.item);

    this.geoTargetingSelectedService.addItems(matchedItems);
  }

  /**
   * Dispatch process input value actions with passed input value
   * @param inputValue
   */
  processInputValue (inputValue) {
    this._store.dispatch(this.geoTargetingSearchActions.processInputValue(inputValue));
    this.search();
  }

  /**
   * Request for model queries items and return updated model
   * @param model$
   * @returns {Observable<R>}
   */
  getQueryItemsUpdatedModelStream = (model$ = this.model$) => {
    return model$
      .take(1)
      .mergeMap((model) => {
        let updatedModel = Object.assign({}, model, {items: [], termsMatches: [], termsFound: [], termsNotFound: []});

        return Observable.forkJoin(model.termsGrouped.queries.map((query) => this.geoTargetingApiService.search(query)),
          (...results) => {
            return results.reduce((acc: GeoTargetingSearchState, items, index) => {
              let query        = model.termsGrouped.queries[index];
              let term         = model.terms.filter((t) => t.query === query)[0];
              let matchedItems = items.filter((item) => model.termsGrouped.queries[index] === item.name.toLowerCase());
              let matchedItem  = matchedItems[0];

              if (matchedItem) {
                acc.termsMatches.push({term, item: matchedItem});
                acc.termsFound.push(term);
              } else {
                acc.termsNotFound.push(term);
              }

              acc.items = acc.items.concat(items);

              return acc;
            }, updatedModel);
          });
      })
      .take(1);
  };

  /**
   * Request for model custom locations items and return updated model
   * @param model$
   * @returns {Observable<R>}
   */
  getCustomLocationItemsUpdatedModelStream = (model$ = this.model$) => {
    return model$
      .take(1)
      .mergeMap((model) => {
        let updatedModel = Object.assign({}, model, {items: [], termsMatches: [], termsFound: [], termsNotFound: []});

        if (!model.termsGrouped.customLocationKeys.length) {
          return Observable.of(updatedModel);
        }

        return this.geoTargetingApiService.metaData({custom_locations: model.termsGrouped.customLocationKeys})
                   .scan((acc: GeoTargetingSearchState, metaData) => {
                     let customLocations = metaData['custom_locations'];

                     acc.items = Object.values(customLocations);

                     model.termsGrouped.customLocationKeys.forEach((customLocationKey) => {
                       let term = model.terms.filter((t) => t.customLocationKey === customLocationKey)[0];
                       let item = customLocations[customLocationKey];

                       if (item) {
                         acc.termsMatches.push({term, item});
                         acc.termsFound.push(term);
                       } else {
                         acc.termsNotFound.push(term);
                       }
                     });

                     return acc;
                   }, updatedModel);
      })
      .take(1);
  };

  /**
   * Propagate model with found items and dispatch update model action
   */
  search () {
    this.model$
        .take(1)
        .do(() => this._store.dispatch(this.geoTargetingSearchActions.updateModel({fetching: true})))
        .mergeMap((model) => {
          return Observable.forkJoin(
            this.getCustomLocationItemsUpdatedModelStream(),
            this.getQueryItemsUpdatedModelStream(),
            (...results) => {
              let updatedModel = Object.assign({}, model, {
                items:         [],
                termsMatches:  [],
                termsFound:    [],
                termsNotFound: []
              });

              results.forEach((result) => {
                updatedModel.items         = updatedModel.items.concat(result.items);
                updatedModel.termsMatches  = updatedModel.termsMatches.concat(result.termsMatches);
                updatedModel.termsFound    = updatedModel.termsFound.concat(result.termsFound);
                updatedModel.termsNotFound = updatedModel.termsNotFound.concat(result.termsNotFound);
              });

              return updatedModel;
            });
        })
        .do(() => this._store.dispatch(this.geoTargetingSearchActions.updateModel({fetching: false})))
        .subscribe((updatedModel) => {
          this._store.dispatch(
            this.geoTargetingSearchActions.updateModel(
              Object.assign(updatedModel, {
                isDropdownOpen: updatedModel.terms.length === 1
              })
            )
          );
          // If multi search, select FOUND terms and inform about NOT FOUND
          if (updatedModel.terms.length > 1) {
            this.informAboutNotFoundTerms(updatedModel);
            this.selectFoundTerms(updatedModel);
            this.setInput(updatedModel.termsNotFound.map((term) => term.input)
                                      .join(';'));
          }
        });
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingSearchActions: GeoTargetingSearchActions,
               private geoTargetingSelectedService: GeoTargetingSelectedService,
               private geoTargetingInfoService: GeoTargetingInfoService,
               private geoTargetingApiService: GeoTargetingApiService,
               private translateService: TranslateService) {
    this.model$ = this._store.let(GeoTargetingSearchService.getModel);
  }
}
