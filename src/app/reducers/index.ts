import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { routerReducer, RouterState } from '@ngrx/router-store';
import { LibState, LIB_REDUCERS } from '../../lib/lib-reducers';
import { storeFreeze } from 'ngrx-store-freeze';

export interface AppState extends LibState {
  router: RouterState;
}

export const reducers = Object.assign({}, {
  router: routerReducer,
}, LIB_REDUCERS);

// Generate a reducer to set the root state in dev mode for HMR
function stateSetter (reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

const DEV_REDUCERS = [stateSetter, storeFreeze];
if (['logger', 'both'].includes(STORE_DEV_TOOLS)) { // set in constants.js file of project root
  DEV_REDUCERS.push(storeLogger());
}

const developmentReducer = compose(...DEV_REDUCERS, combineReducers)(reducers);
const productionReducer  = combineReducers(reducers);

export function rootReducer (state: any, action: any) {
  if (ENV !== 'development') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
