import { ActionReducer, Action } from '@ngrx/store';
import { AudienceActions } from './audience.actions';
export interface AudienceIndexesState {
  editIndex: number | null;
  updateIndex: number | null;
}

export const audienceIndexesInitial = {
  editIndex:   null,
  updateIndex: null
};

export const AUDIENCE_INDEXES_KEY = 'audienceIndexes';

export const audienceIndexesReducer: ActionReducer<AudienceIndexesState> = (state = audienceIndexesInitial,
                                                                            action: Action) => {
  switch (action.type) {
    case AudienceActions.SET_EDIT_AUDIENCE_INDEX:
      return Object.assign({}, state, {editIndex: action.payload.index});
    case AudienceActions.SET_UPDATE_AUDIENCE_INDEX:
      return Object.assign({}, state, {updateIndex: action.payload.index});
    default:
      return state;
  }
};
