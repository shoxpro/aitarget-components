import { Action, ActionReducer } from '@ngrx/store';
import { GeoTargetingSearchActions } from './geo-targeting-search.actions';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { getCustomLocationKey, getQuery } from './geo-targeting-search.constants';

interface Term {
  input: string;
  query: string;
  customLocationKey: string;
}

export interface GeoTargetingSearchState {
  inputValue: string;
  terms: Array<Term>;
  termsGrouped: {queries: Array<string>; customLocationKeys: Array<string>};
  termsFound: Array<string>;
  termsNotFound: Array<string>;
  termsMatches: Array<{term: Term; item: GeoTargetingItem}>;
  items: Array<GeoTargetingItem>;
  fetching: boolean;
}

export const geoTargetingSearchInitial: GeoTargetingSearchState = {
  inputValue:    '',
  terms:         [],
  termsGrouped:  {
    queries:            [],
    customLocationKeys: []
  },
  termsFound:    [],
  termsNotFound: [],
  termsMatches:  [],
  items:         [],
  fetching:      false
};

export const GEO_TARGETING_SEARCH_KEY = 'geoTargetingSearch';

export const geoTargetingSearchReducer: ActionReducer<GeoTargetingSearchState> = (state = geoTargetingSearchInitial,
                                                                                  action: Action) => {
  action.payload = action.payload || {};

  let inputValue;
  let terms;
  let termsGrouped;

  switch (action.type) {
    case GeoTargetingSearchActions.PROCESS_INPUT_VALUE:
      inputValue = action.payload.inputValue;
      terms      = inputValue.split(';')
                             .filter((term) => term !== '')
                             .reduce((acc, input) => {
                               acc.push({
                                 input:             input,
                                 query:             getQuery(input),
                                 customLocationKey: getCustomLocationKey(input)
                               });

                               return acc;
                             }, []);

      termsGrouped = terms.reduce((acc, term) => {
        if (term.query) {
          acc.queries.push(term.query);
        } else {
          acc.customLocationKeys.push(term.customLocationKey);
        }

        return acc;
      }, {queries: [], customLocationKeys: []});

      return Object.assign({}, state, {inputValue, terms, termsGrouped});
    case GeoTargetingSearchActions.UPDATE_MODEL:
      console.log('action.payload.model: ', action.payload.model);
      return Object.assign({}, state, action.payload.model);
    default:
      return state;
  }
};
