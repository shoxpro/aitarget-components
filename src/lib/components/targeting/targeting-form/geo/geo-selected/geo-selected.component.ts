import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GeoSelectedService } from './geo-selected.service';
import { GeoItem } from '../geo-item.interface';
import { GeoMapService } from '../geo-map/geo-map.service';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { GeoSearchService } from '../geo-search/geo-search.service';
import { GeoModeType } from '../geo-mode/geo-mode.reducer';
import { GeoModeService } from '../geo-mode/geo-mode.service';
import { AppState } from '../../../../../../app/reducers/index';

@Component({
  selector:        'fba-geo-selected',
  templateUrl:     'geo-selected.component.html',
  styleUrls:       ['geo-selected.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoSelectedComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  model$;
  modelMode$;
  itemsGroupedByCountry$;

  groupHovered: Object = {};

  constructor (private _store: Store<AppState>,
               private geoSelectedService: GeoSelectedService,
               private geoSearchService: GeoSearchService,
               private geoMapService: GeoMapService,
               private geoModeService: GeoModeService,
               private changeDetectorRef: ChangeDetectorRef) {
    this.model$     = this._store.let(this.geoSelectedService.getModel);
    this.modelMode$ = this._store.let(this.geoModeService.getModel);
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
  showItemOnMap (item: GeoItem) {
    this.geoSearchService.toggleMap(true);
    this.geoMapService.focusItem(item);
  }

  /**
   * Remove all items in country group
   * @param key
   * @param event
   */
  removeGroup (key) {
    this.itemsGroupedByCountry$
        .take(1)
        .subscribe(({map}) => this.geoSelectedService.removeItems(map[key].items));
  }

  /**
   * Remove passed item from selected items list
   * @param item
   * @param event
   */
  removeItem (item: GeoItem) {
    this.geoSelectedService.removeItems([item]);
  }

  /**
   * Toggle Dropdown
   */
  toggleModeDropdown (itemMode: any, isOpen: boolean) {
    itemMode.isOpen = isOpen;

    this.changeDetectorRef.markForCheck();
  }

  modeChange (item: GeoItem, mode: GeoModeType) {
    const updatedItem = Object.assign({}, item, {excluded: mode.id === 'exclude'});

    this.geoSelectedService.updateItems([updatedItem]);

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

            items.forEach((item: GeoItem) => {
              let countryCode        = ['country', 'country_group'].includes(item.type) ? item.key : item.country_code;
              map[countryCode]       = map[countryCode] || {};
              map[countryCode].name  = ['country', 'country_group'].includes(item.type) ? item.name : item.country_name;
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
