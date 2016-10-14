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
  private items: GeoTargetingItem[];
  private itemsGroupedByCountry: Object = {};
  private groupHovered: Object          = {};
  private subscriptions                 = [];
  private itemsGroupedByCountryKeys     = [];

  constructor (private GeoTargetingSelectedService: GeoTargetingSelectedService,
               private GeoTargetingMapService: GeoTargetingMapService,
               private ChangeDetectorRef: ChangeDetectorRef) { }

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  /**
   * Mark hovered groups with proper class
   * @param key
   * @param isHovered
   */
  public hoverGroup (key, isHovered) {
    this.groupHovered[key] = isHovered;
    this.updateTemplate();
  }

  /**
   * Show item on the map
   * @param item
   */
  public showItemOnMap (item: GeoTargetingItem) {
    this.GeoTargetingMapService.showMap();
    this.GeoTargetingMapService.focusItem(item);
  }

  /**
   * Remove all items in country group
   * @param key
   * @param event
   */
  public removeGroup (key, event?) {
    if (event) {
      event.stopPropagation();
    }
    this.itemsGroupedByCountry[key].items.forEach((item: GeoTargetingItem) => {
      this.GeoTargetingSelectedService.remove(item);
    });
  }

  /**
   * Remove passed item from selected items list
   * @param item
   * @param event
   */
  public removeItem (item: GeoTargetingItem, event?) {
    if (event) {
      event.stopPropagation();
    }
    this.GeoTargetingSelectedService.remove(item);
  }

  /**
   * Toggle Dropdown
   */
  public toggleModeDropdown (itemMode: any, event) {
    if (event) {
      event.stopPropagation();
    }
    itemMode.isOpen = !itemMode.isOpen;
    this.updateTemplate();
  }

  public setExcluded (itemMode, item: GeoTargetingItem, excluded: boolean) {
    itemMode.isOpen = false;

    item.excluded = excluded;

    this.GeoTargetingSelectedService.updateSelectedItem(item);
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
      this.GeoTargetingSelectedService.items.subscribe((items: GeoTargetingItem[]) => {
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
