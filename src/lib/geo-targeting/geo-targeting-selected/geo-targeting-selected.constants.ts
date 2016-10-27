import { GeoTargetingItem } from '../geo-targeting-item.interface';

export const sortItems = (items) => {
  return items.sort((a: GeoTargetingItem, b: GeoTargetingItem) => a.excluded > b.excluded);
};
