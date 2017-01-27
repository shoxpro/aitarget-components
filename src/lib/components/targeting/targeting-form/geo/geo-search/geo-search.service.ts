import { Injectable } from '@angular/core';
import { GeoSearchActions } from './geo-search.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { GeoSearchState, geoSearchInitial, GEO_TARGETING_SEARCH_KEY } from './geo-taregting-search.reducer';
import { GeoApiService } from '../geo-api/geo-api.service';
import { TranslateService } from 'ng2-translate';
import { GeoInfoService } from '../geo-info/geo-info.service';
import { GeoSelectedService } from '../geo-selected/geo-selected.service';
import { GEO_TARGETING_STATE_KEY, GeoState } from '../geo.reducer';
import { GeoIdService } from '../geo.id';
import { AppState } from '../../../../../../app/reducers/index';
import { SdkError } from '../../../../../shared/errors/sdkError';
import { GeoItem } from '../geo-item.interface';

@Injectable()
export class GeoSearchService {
  model$;

  getModel = (_store): Observable<GeoSearchState> => {
    return _store.select(GEO_TARGETING_STATE_KEY)
                 .map((geo) => {
                   let id = this.geoIdService.id$.getValue();
                   return geo[id];
                 })
                 .filter((geoState: GeoState) => Boolean(geoState))
                 .map((geoState: GeoState) => {
                   return geoState[GEO_TARGETING_SEARCH_KEY];
                 })
                 .distinctUntilChanged();
  };

  focus () {
    this._store.dispatch(this.geoSearchActions.updateModel({hasFocus: true}));
  }

  blur () {
    this._store.dispatch(this.geoSearchActions.updateModel({hasFocus: false}));
  }

  fetching (fetching: boolean) {
    this._store.dispatch(this.geoSearchActions.updateModel({fetching}));
  }

  toggleDropdown (toOpen: boolean) {
    this.model$
        .take(1)
        .subscribe((model) => {
          // Open dropdown only for single search and if there are items to show
          let isDropdownOpen = Boolean(toOpen && model.items.length && model.terms.length === 1);
          this._store.dispatch(this.geoSearchActions.updateModel({isDropdownOpen}));
        });
  }

  toggleMap (isMapOpen: boolean) {
    this._store.dispatch(this.geoSearchActions.updateModel({isMapOpen}));
  }

  setInput (inputValue) {
    this._store.dispatch(this.geoSearchActions.updateModel(
      Object.assign({}, geoSearchInitial, {inputValue, hasFocus: true})
    ));
  }

  /**
   * Reset to initial but remain focus
   */
  reset () {
    this._store.dispatch(this.geoSearchActions.updateModel(
      Object.assign({}, geoSearchInitial, {hasFocus: true})
    ));
  }

  informAboutNotFoundTerms (model: GeoSearchState) {
    if (!model.termsNotFound.length) {
      this.geoInfoService.hideInfo();
      return;
    }

    const notFoundInputs    = model.termsNotFound.map((term) => term.input);
    const notFoundInputsStr = notFoundInputs.join(', ');

    let message = this.translateService.instant(`fba-geo-info.MESSAGE_NOT_FOUND`, {notFoundInputsStr});

    this.geoInfoService.showInfo({message});
  }

  selectFoundTerms (model: GeoSearchState) {
    let matchedItems = model.termsMatches.map((term) => term.item);

    this.geoSelectedService.addItems(matchedItems);
  }

  /**
   * Dispatch process input value actions with passed input value
   * @param inputValue
   */
  processInputValue (inputValue) {
    this._store.dispatch(this.geoSearchActions.processInputValue(inputValue));
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
      .switchMap((model) => {
        let updatedModel = Object.assign({}, model, {items: [], termsMatches: [], termsFound: [], termsNotFound: []});

        if (!model.termsGrouped.queries.length) {
          return Observable.of(updatedModel);
        }

        return Observable.forkJoin(model.termsGrouped.queries.map((query) => {
            return this.geoApiService.search(query);
          }),
          (...results) => {
            return results.reduce((acc: GeoSearchState, items: Array<GeoItem>, index) => {
              let query        = model.termsGrouped.queries[index];
              let term         = model.terms.filter((t) => t.query === query)[0];
              let matchedItems = items.filter((item) => item.name.toLowerCase()
                                                            .includes(model.termsGrouped.queries[index]));
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
      });
  };

  /**
   * Request for model custom locations items and return updated model
   * @param model$
   * @returns {Observable<R>}
   */
  getCustomLocationItemsUpdatedModelStream = (model$ = this.model$) => {
    return model$
      .take(1)
      .switchMap((model) => {
        let updatedModel = Object.assign({}, model, {items: [], termsMatches: [], termsFound: [], termsNotFound: []});

        if (!model.termsGrouped.customLocationKeys.length) {
          return Observable.of(updatedModel);
        }

        return this.geoApiService.metaData({custom_locations: model.termsGrouped.customLocationKeys})
                   .scan((acc: GeoSearchState, metaData) => {
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
      });
  };

  /**
   * Propagate model with found items and dispatch update model action
   */
  search () {
    this.model$
        .take(1)
        .do(() => this.fetching(true))
        .switchMap((model) => {
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
        .do(() => this.fetching(false))
        .subscribe({
          next:  (updatedModel) => {
            this._store.dispatch(
              this.geoSearchActions.updateModel(
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
          },
          error: (error) => {
            if (error instanceof SdkError) {
              this.geoInfoService.showInfo({level: 'error', message: error.message});
            }
            this._store.dispatch(this.geoSearchActions.updateModel({fetching: false}));
          }
        });
  }

  constructor (private _store: Store<AppState>,
               private geoSearchActions: GeoSearchActions,
               private geoSelectedService: GeoSelectedService,
               private geoInfoService: GeoInfoService,
               private geoApiService: GeoApiService,
               private geoIdService: GeoIdService,
               private translateService: TranslateService) {
    this.model$ = this._store.let(this.getModel);
  }
}
