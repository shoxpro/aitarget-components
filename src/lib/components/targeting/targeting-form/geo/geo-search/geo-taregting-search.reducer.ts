import { Action, ActionReducer } from '@ngrx/store';
import { GeoSearchActions } from './geo-search.actions';
import { GeoItem } from '../geo-item.interface';
import { getCustomLocationKey, getQuery } from './geo-search.constants';

interface Term {
  input: string;
  query: string;
  customLocationKey: string;
}

export interface GeoSearchState {
  inputValue: string;
  terms: Array<Term>;
  termsGrouped: {queries: Array<string>; customLocationKeys: Array<string>};
  termsFound: Array<Term>;
  termsNotFound: Array<Term>;
  termsMatches: Array<{term: Term; item: GeoItem}>;
  items: Array<GeoItem>;
  fetching: boolean;
  hasFocus: boolean;
  isDropdownOpen: boolean;
  isMapOpen: boolean;
}

export const geoSearchInitial: GeoSearchState = {
  inputValue:     '',
  terms:          [],
  termsGrouped:   {
    queries:            [],
    customLocationKeys: []
  },
  termsFound:     [],
  termsNotFound:  [],
  termsMatches:   [],
  items:          [],
  fetching:       false,
  hasFocus:       false,
  isDropdownOpen: false,
  isMapOpen:      false
};

export const GEO_TARGETING_SEARCH_KEY = 'geoSearch';

export const geoSearchReducer: ActionReducer<GeoSearchState> = (state = geoSearchInitial,
                                                                action: Action) => {
  action.payload = action.payload || {};

  let inputValue;
  let terms;
  let termsGrouped;

  switch (action.type) {
    case GeoSearchActions.PROCESS_INPUT_VALUE:
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
        }

        if (term.customLocationKey) {
          acc.customLocationKeys.push(term.customLocationKey);
        }

        return acc;
      }, {queries: [], customLocationKeys: []});

      return Object.assign({}, state, {inputValue, terms, termsGrouped});
    case GeoSearchActions.UPDATE_MODEL:
      return Object.assign({}, state, action.payload.model);
    default:
      return state;
  }
};
