import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GeoTargetingSelectedService } from './geo-targeting-selected.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { Subject } from 'rxjs';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingSearchService } from '../geo-targeting-search/geo-targeting-search.service';
import { GeoTargetingModeType } from '../geo-targeting-mode/geo-targeting-mode.reducer';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';

@Component({
  selector:        'geo-targeting-selected',
  templateUrl:     './geo-targeting-selected.component.html',
  styleUrls:       ['./geo-targeting-selected.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingSelectedComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  model$;
  modelMode$;
  itemsGroupedByCountry$;

  groupHovered: Object = {};

  constructor (private _store: Store<AppState>,
               private geoTargetingSelectedService: GeoTargetingSelectedService,
               private geoTargetingSearchService: GeoTargetingSearchService,
               private geoTargetingMapService: GeoTargetingMapService,
               private geoTargetingModeService: GeoTargetingModeService,
               private changeDetectorRef: ChangeDetectorRef) {
    this.model$     = this._store.let(this.geoTargetingSelectedService.getModel);
    this.modelMode$ = this._store.let(this.geoTargetingModeService.getModel);
  }

  /**
   * Mark hovered groups with proper class
   * @param key
   * @param isHovered
   */
  hoverGroup (key, isHovered) {
    this.groupHovered[key] = isHovered;
    this.changeDetectorRef.markForCheck();
  }

  /**
   * Show item on the map
   * @param item
   */
  showItemOnMap (item: GeoTargetingItem) {
    this.geoTargetingSearchService.toggleMap(true);
    this.geoTargetingMapService.focusItem(item);
  }

  /**
   * Remove all items in country group
   * @param key
   * @param event
   */
  removeGroup (key) {
    this.itemsGroupedByCountry$
        .take(1)
        .subscribe(({map}) => this.geoTargetingSelectedService.removeItems(map[key].items));
  }

  /**
   * Remove passed item from selected items list
   * @param item
   * @param event
   */
  removeItem (item: GeoTargetingItem) {
    this.geoTargetingSelectedService.removeItems([item]);
  }

  /**
   * Toggle Dropdown
   */
  toggleModeDropdown (itemMode: any, isOpen: boolean) {
    itemMode.isOpen = isOpen;

    this.changeDetectorRef.markForCheck();
  }

  modeChange (item: GeoTargetingItem, mode: GeoTargetingModeType) {
    const updatedItem = Object.assign({}, item, {excluded: mode.id === 'exclude'});

    this.geoTargetingSelectedService.updateItems([updatedItem]);

    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.itemsGroupedByCountry$ =
      this.model$
          .takeUntil(this.destroy$)
          .map(({items}) => {
            let map = {};

            items.forEach((item: GeoTargetingItem) => {
              let countryCode        = item.type === 'country' ? item.key : item.country_code;
              map[countryCode]       = map[countryCode] || {};
              map[countryCode].name  = item.type === 'country' ? item.name : item.country_name;
              map[countryCode].items = map[countryCode].items || [];
              // Put excluded items after included
              if (item.excluded) {
                map[countryCode].items.push(item);
              } else {
                map[countryCode].items.unshift(item);
              }
            });

            let keys = Object.keys(map);

            return {map, keys};
          });
  }

}
