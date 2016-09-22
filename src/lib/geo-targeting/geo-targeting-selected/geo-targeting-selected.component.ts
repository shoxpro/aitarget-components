import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GeoTargetingSelectedService } from './geo-targeting-selected.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';

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
   * Remove all items in country group
   * @param key
   */
  public removeGroup (key) {
    this.itemsGroupedByCountry[key].items.forEach((item: GeoTargetingItem) => {
      this.GeoTargetingSelectedService.remove(item);
    });
  }

  public removeItem (item: GeoTargetingItem) {
    this.GeoTargetingSelectedService.remove(item);
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
          this.itemsGroupedByCountry[item.country_code]       = this.itemsGroupedByCountry[item.country_code] || {};
          this.itemsGroupedByCountry[item.country_code].name  = item.country_name;
          this.itemsGroupedByCountry[item.country_code].items = this.itemsGroupedByCountry[item.country_code].items || [];
          this.itemsGroupedByCountry[item.country_code].items.push(item);
        });

        this.itemsGroupedByCountryKeys = Object.keys(this.itemsGroupedByCountry);

        this.updateTemplate();
      })
    );
  }

}
