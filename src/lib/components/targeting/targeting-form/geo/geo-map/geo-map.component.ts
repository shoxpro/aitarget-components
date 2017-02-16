import {
  Component, OnInit, ViewEncapsulation, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewContainerRef, Output,
  EventEmitter, Input, ElementRef
} from '@angular/core';
import { GeoMapService } from './geo-map.service';
import { GeoItem } from '../geo-item.interface';
import { GeoSelectedService } from '../geo-selected/geo-selected.service';
import { TranslateService } from 'ng2-translate/src/translate.service';
import { Subject } from 'rxjs/Subject';
import { AppState } from '../../../../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { ComponentsHelperService } from '../../../../../shared/services/components-helper.service';

@Component({
  selector:        'fba-geo-map',
  templateUrl:     'geo-map.component.html',
  styleUrls:       ['geo-map.component.scss', '../../../../../../../node_modules/leaflet/dist/leaflet.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:   ViewEncapsulation.None
})
export class GeoMapComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  modelSelected$;

  @Input() isOpen;

  @Output() toggleMap = new EventEmitter();

  pinMode;

  constructor (private _store: Store<AppState>,
               private geoMapService: GeoMapService,
               private translateService: TranslateService,
               private componentsHelperService: ComponentsHelperService,
               private geoSelectedService: GeoSelectedService,
               private changeDetectorRef: ChangeDetectorRef,
               private viewContainerRef: ViewContainerRef,
               private elementRef: ElementRef) {
    this.componentsHelperService.setRootViewContainerRef(this.viewContainerRef);
    this.modelSelected$ = this._store.let(this.geoSelectedService.getModel);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    let map = this.elementRef.nativeElement.querySelector('.fba-geo-map__element');
    this.geoMapService.initializeMap(map);

    // Update map when selected items change
    this.modelSelected$
        .takeUntil(this.destroy$)
        .map((model) => model.items)
        .subscribe((items: GeoItem[]) => {
          // Clear all existing items layers and remove it from itemsMap
          for (let key in this.geoMapService.itemsMap) {
            if (this.geoMapService.itemsMap.hasOwnProperty(key)) {
              this.geoMapService.itemsMap[key].featureGroup.clearLayers();
              delete this.geoMapService.itemsMap[key];
            }
          }

          // Draw selected items on the map
          items.forEach((item: GeoItem) => {
            this.geoMapService.drawItem(item);
          });

          // If has items focus on the fist active or first in the list, if not - show world
          if (items.length) {
            const activeItems = items.filter((item) => item.active);
            const itemToFocus = activeItems.length ? activeItems[0] : items[0];
            this.geoMapService.focusItem(itemToFocus);
          } else {
            this.geoMapService.setView();
          }
        });

    // Subscribe to map's pin mode flag
    this.geoMapService.pinMode
        .takeUntil(this.destroy$)
        .filter(() => this.isOpen)
        .subscribe((pinMode) => {
          this.pinMode = pinMode;
          if (pinMode) {
            this.geoMapService.enterPinMode();
          } else {
            this.geoMapService.exitPinMode();
          }
          this.changeDetectorRef.markForCheck();
        });

    /**
     * Update map when language change
     */
    this.translateService.onLangChange
        .takeUntil(this.destroy$)
        .subscribe((event) => {
          this.geoMapService.setTileUrl(this.geoMapService.getTileUrl(event.lang), false);
          this.changeDetectorRef.markForCheck();
        });
  }

}
