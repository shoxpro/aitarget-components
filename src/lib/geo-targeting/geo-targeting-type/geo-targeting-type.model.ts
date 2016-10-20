import { GEO_TARGETING_STATE_KEY, GeoTargetingState } from '../geo-targeting.interface';
import { GEO_TARGETING_TYPE_STATE_KEY, GeoTargetingTypeState } from './geo-targeting-type.interface';
import { Observable } from 'rxjs/Rx';

export const typeModel = (_store): Observable<GeoTargetingTypeState> => {
  return _store.select(GEO_TARGETING_STATE_KEY)
               .map((geoTargetingState: GeoTargetingState) => geoTargetingState[GEO_TARGETING_TYPE_STATE_KEY])
               .distinctUntilChanged();
};
