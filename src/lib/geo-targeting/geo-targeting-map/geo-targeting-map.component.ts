import {
  Component, OnInit, ViewEncapsulation, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewContainerRef
} from '@angular/core';
import { GeoTargetingMapService } from './geo-targeting-map.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ComponentsHelperService } from '../../shared/services/components-helper.service';
import { GeoTargetingService } from '../geo-targeting.service';

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
  private pinMode;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  constructor (private GeoTargetingSelectedService: GeoTargetingSelectedService,
               private ChangeDetectorRef: ChangeDetectorRef,
               private TranslateService: TranslateService,
               private ViewContainerRef: ViewContainerRef,
               private GeoTargetingService: GeoTargetingService,
               private ComponentsHelperService: ComponentsHelperService,
               private GeoTargetingMapService: GeoTargetingMapService) {
    this.ComponentsHelperService.setRootViewContainerRef(ViewContainerRef);
  }

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
        this.updateTemplate();
      })
    );

    // Subscribe to map's pin mode flag
    this._subscriptions.push(
      this.GeoTargetingMapService.pinMode.subscribe((pinMode) => {
        this.pinMode = pinMode;
        if (pinMode) {
          this.GeoTargetingMapService.enterPinMode();
        } else {
          this.GeoTargetingMapService.exitPinMode();
        }
        this.updateTemplate();
      })
    );

    /**
     * Process Escape and outside click and hide map if it is open
     */
    this._subscriptions.push(
      this.GeoTargetingService.clickOutsideOfGeoStream
          .merge(this.GeoTargetingService.escapeStream)
          .filter(() => this.mapActive)
          .subscribe(() => {
            this.GeoTargetingMapService.hideMap();
          })
    );

    /**
     * Update map when language change
     */
    this._subscriptions.push(
      this.TranslateService.onLangChange.subscribe((event) => {
        this.GeoTargetingMapService.setTileUrl(this.GeoTargetingMapService.getTileUrl(event.lang), false);
        this.updateTemplate();
      })
    );
  }

}
