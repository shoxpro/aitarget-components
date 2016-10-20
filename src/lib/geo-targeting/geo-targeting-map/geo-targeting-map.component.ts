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
  _subscriptions = [];
  mapActive;
  mapModeText    = this.translateService.instant(`geo-targeting-map.SHOW_MAP`);
  pinMode;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Set map mode text depending on whether map is active or not
   * @param mapActive
   */
  setMapModeText (mapActive = this.mapActive) {
    if (mapActive) {
      this.mapModeText = this.translateService.instant(`geo-targeting-map.HIDE_MAP`);
    } else {
      this.mapModeText = this.translateService.instant(`geo-targeting-map.SHOW_MAP`);
    }

    this.updateTemplate();
  }

  constructor (private geoTargetingSelectedService: GeoTargetingSelectedService,
               private changeDetectorRef: ChangeDetectorRef,
               private translateService: TranslateService,
               private viewContainerRef: ViewContainerRef,
               private componentsHelperService: ComponentsHelperService,
               private geoTargetingMapService: GeoTargetingMapService,
               private geoTargetingService: GeoTargetingService) {
    this.componentsHelperService.setRootViewContainerRef(viewContainerRef);
  }

  /**
   * Show or hide map
   * @param event
   */
  toggleMap (event?) {
    if (event) {
      event.stopPropagation();
    }

    if (this.mapActive) {
      this.geoTargetingMapService.hideMap();
    } else {
      this.geoTargetingMapService.showMap();
    }
  }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this.geoTargetingMapService.initializeMap();

    // Update map when selected items change
    this._subscriptions.push(
      this.geoTargetingSelectedService.items
          .subscribe((items: GeoTargetingItem[]) => {
            // Clear all existing items layers
            for (let key in this.geoTargetingMapService.itemsMap) {
              if (this.geoTargetingMapService.itemsMap.hasOwnProperty(key)) {
                this.geoTargetingMapService.itemsMap[key].featureGroup.clearLayers();
              }
            }

            // Draw selected items on the map
            items.forEach((item: GeoTargetingItem) => {
              this.geoTargetingMapService.drawItem(item);
            });

            // If has items focus on the fist one, if not - show world
            if (items.length) {
              this.geoTargetingMapService.focusItem(items[0]);
            } else {
              this.geoTargetingMapService.setView();
            }
          })
    );

    // Subscribe to map's visibility flag
    this._subscriptions.push(
      this.geoTargetingMapService.mapActive.subscribe((mapActive) => {
        this.mapActive = mapActive;
        this.updateTemplate();
      })
    );

    // Subscribe to map's pin mode flag
    this._subscriptions.push(
      this.geoTargetingMapService.pinMode.subscribe((pinMode) => {
        this.pinMode = pinMode;
        if (pinMode) {
          this.geoTargetingMapService.enterPinMode();
        } else {
          this.geoTargetingMapService.exitPinMode();
        }
        this.updateTemplate();
      })
    );

    /**
     * Process Escape and outside click and hide map if it is open
     */
    this._subscriptions.push(
      this.geoTargetingService.clickOutsideOfGeoStream
          .merge(this.geoTargetingService.escapeStream)
          .filter(() => this.mapActive)
          .subscribe(() => {
            this.geoTargetingMapService.hideMap();
          })
    );

    /**
     * Update map when language change
     */
    this._subscriptions.push(
      this.translateService.onLangChange.subscribe((event) => {
        this.setMapModeText(this.mapActive);
        this.geoTargetingMapService.setTileUrl(this.geoTargetingMapService.getTileUrl(event.lang), false);
        this.updateTemplate();
      })
    );
  }

}
