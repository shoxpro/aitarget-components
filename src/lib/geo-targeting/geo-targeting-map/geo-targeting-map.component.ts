import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { GeoTargetingMapService } from './geo-targeting-map.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';

@Component({
  selector:      'geo-targeting-map',
  templateUrl:   './geo-targeting-map.component.html',
  styleUrls:     ['./geo-targeting-map.component.css', '../../../../node_modules/leaflet/dist/leaflet.css'],
  encapsulation: ViewEncapsulation.None
})
export class GeoTargetingMapComponent implements OnInit, OnDestroy {
  private _subscriptions = [];

  constructor (private GeoTargetingSelectedService: GeoTargetingSelectedService,
               private GeoTargetingMapService: GeoTargetingMapService) {}

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
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
  }

}
