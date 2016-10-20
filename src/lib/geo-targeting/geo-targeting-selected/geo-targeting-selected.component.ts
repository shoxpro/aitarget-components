import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GeoTargetingSelectedService } from './geo-targeting-selected.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';

@Component({
  selector:        'geo-targeting-selected',
  templateUrl:     './geo-targeting-selected.component.html',
  styleUrls:       ['./geo-targeting-selected.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingSelectedComponent implements OnInit, OnDestroy {
  items: GeoTargetingItem[];
  itemsGroupedByCountry: Object = {};
  groupHovered: Object          = {};
  subscriptions                 = [];
  itemsGroupedByCountryKeys     = [];

  constructor (private geoTargetingSelectedService: GeoTargetingSelectedService,
               private geoTargetingMapService: GeoTargetingMapService,
               private changeDetectorRef: ChangeDetectorRef) { }

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Mark hovered groups with proper class
   * @param key
   * @param isHovered
   */
  hoverGroup (key, isHovered) {
    this.groupHovered[key] = isHovered;
    this.updateTemplate();
  }

  /**
   * Show item on the map
   * @param item
   */
  showItemOnMap (item: GeoTargetingItem) {
    this.geoTargetingMapService.showMap();
    this.geoTargetingMapService.focusItem(item);
  }

  /**
   * Remove all items in country group
   * @param key
   * @param event
   */
  removeGroup (key, event?) {
    if (event) {
      event.stopPropagation();
    }
    this.itemsGroupedByCountry[key].items.forEach((item: GeoTargetingItem) => {
      this.geoTargetingSelectedService.remove(item);
    });
  }

  /**
   * Remove passed item from selected items list
   * @param item
   * @param event
   */
  removeItem (item: GeoTargetingItem, event?) {
    if (event) {
      event.stopPropagation();
    }
    this.geoTargetingSelectedService.remove(item);
  }

  /**
   * Toggle Dropdown
   */
  toggleModeDropdown (itemMode: any, event) {
    if (event) {
      event.stopPropagation();
    }
    itemMode.isOpen = !itemMode.isOpen;
    this.updateTemplate();
  }

  setExcluded (itemMode, item: GeoTargetingItem, excluded: boolean) {
    itemMode.isOpen = false;

    item.excluded = excluded;

    this.geoTargetingSelectedService.updateSelectedItem(item);
    this.updateTemplate();
  }

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this.subscriptions.push(
      this.geoTargetingSelectedService.items.subscribe((items: GeoTargetingItem[]) => {
        this.items                 = items;
        this.itemsGroupedByCountry = {};

        this.items.forEach((item: GeoTargetingItem) => {
          let countryCode                               = item.type === 'country' ? item.key : item.country_code;
          this.itemsGroupedByCountry[countryCode]       = this.itemsGroupedByCountry[countryCode] || {};
          this.itemsGroupedByCountry[countryCode].name  = item.type === 'country' ? item.name : item.country_name;
          this.itemsGroupedByCountry[countryCode].items = this.itemsGroupedByCountry[countryCode].items || [];
          // Put excluded items after included
          if (item.excluded) {
            this.itemsGroupedByCountry[countryCode].items.push(item);
          } else {
            this.itemsGroupedByCountry[countryCode].items.unshift(item);
          }
        });

        this.itemsGroupedByCountryKeys = Object.keys(this.itemsGroupedByCountry);

        this.updateTemplate();
      })
    );
  }

}
