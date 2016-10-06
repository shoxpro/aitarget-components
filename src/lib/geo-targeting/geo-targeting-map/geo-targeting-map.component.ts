import {
  Component, OnInit, ViewEncapsulation, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import { GeoTargetingMapService } from './geo-targeting-map.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';

@Component({
  selector:        'geo-targeting-map',
  templateUrl:     './geo-targeting-map.component.html',
  styleUrls:       ['./geo-targeting-map.component.css', '../../../../node_modules/leaflet/dist/leaflet.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:   ViewEncapsulation.None
})
export class GeoTargetingMapComponent implements OnInit, OnDestroy {
  private _subscriptions = [];
  private mapActive;
  private mapModeText    = 'Show Map';

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  constructor (private GeoTargetingSelectedService: GeoTargetingSelectedService,
               private ChangeDetectorRef: ChangeDetectorRef,
               private GeoTargetingMapService: GeoTargetingMapService) {}

  /**
   * Show or hide map
   * @param event
   */
  public toggleMap (event?) {
    if (event) {
      event.stopPropagation();
    }

    if (this.mapActive) {
      this.GeoTargetingMapService.hideMap();
    } else {
      this.GeoTargetingMapService.showMap();
    }
  }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    console.log(`ngOnInit!!!`);
    this.GeoTargetingMapService.initializeMap();

    // Update map when selected items change
    this._subscriptions.push(
      this.GeoTargetingSelectedService.items
          .subscribe((items: GeoTargetingItem[]) => {
            // Clear all existing items layers
            for (let key in this.GeoTargetingMapService.itemsMap) {
              if (this.GeoTargetingMapService.itemsMap.hasOwnProperty(key)) {
                this.GeoTargetingMapService.itemsMap[key].featureGroup.clearLayers();
              }
            }

            // Draw selected items on the map
            items.forEach((item: GeoTargetingItem) => {
              this.GeoTargetingMapService.drawItem(item);
            });

            // If has items focus on the fist one, if not - show world
            if (items.length) {
              this.GeoTargetingMapService.focusItem(items[0]);
            } else {
              this.GeoTargetingMapService.setView();
            }
          })
    );

    // Subscribe to map's visibility flag
    this._subscriptions.push(
      this.GeoTargetingMapService.mapActive.subscribe((mapActive) => {
        this.mapActive = mapActive;
        if (mapActive) {
          this.mapModeText = 'Hide Map';
        } else {
          this.mapModeText = 'Show Map';
        }
        this.updateTemplate();
      })
    );
  }

}
