import { Injectable } from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import * as L from 'leaflet';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { BehaviorSubject } from 'rxjs/Rx';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { GeoTargetingModule } from '../geo-targeting.module';
import { ComponentsHelperService } from '../../shared/services/components-helper.service';
import { GeoTargetingPinComponent } from '../geo-targeting-pin/geo-targeting-pin.component';
import { GeoTargetingMapPopupComponent } from '../geo-targeting-map-popup/geo-targeting-map-popup.component';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';

@Injectable()
export class GeoTargetingMapService {
  map;
  _mapActive = new BehaviorSubject<boolean>(false);
  _pinMode   = new BehaviorSubject<boolean>(false);
  zoom       = 1;
  latitude   = 51.505;
  longitude  = -0.09;
  tileLayer;
  popup;

  itemsMap  = {};
  mapActive = this._mapActive.asObservable();
  pinMode   = this._pinMode.asObservable();

  /**
   * Toggle pin mode
   */
  togglePinMode () {
    let pinMode = this._pinMode.getValue();
    this._pinMode.next(!pinMode);
  }

  /**
   * Show map
   */
  showMap () {
    this._mapActive.next(true);
  }

  /**
   * Hide map
   */
  hideMap () {
    this._mapActive.next(false);
  }

  /**
   * Create all item's layers, combine them to feature group and add this group to the map
   * @param item
   */
  drawItem (item: GeoTargetingItem) {
    let marker       = this.getMarkerLayer(item);
    let polygon      = this.setPolygonsLayer(item);
    let radius       = this.getRadiusLayer(item);
    let featureGroup = L.featureGroup([marker, polygon, radius]);

    this.itemsMap[item.key] = {
      marker:       marker,
      polygon:      polygon,
      radius:       radius,
      featureGroup: featureGroup
    };

    featureGroup.addTo(this.map);
  }

  /**
   * Focus map on the passed item
   * If this item is not on the map, draw it before focus
   * @param item
   */
  focusItem (item: GeoTargetingItem) {
    // Draw item if is not drown or has no layers
    if (!this.itemsMap[item.key] || !this.itemsMap[item.key].featureGroup.getLayers().length) {
      this.drawItem(item);
    }
    this.map.fitBounds(this.itemsMap[item.key].featureGroup.getBounds());
  }

  /**
   * Set map view to passed latitude, longitude and zoom or use defaults (world perspective)
   * @param latitude
   * @param longitude
   * @param zoom
   */
  setView (latitude = this.latitude, longitude = this.longitude, zoom = this.zoom) {
    this.map.setView([latitude, longitude], zoom);
  }

  /**
   * Return green or red customized marker layer for included or excluded item
   * @param item
   * @returns {Marker}
   */
  getMarkerLayer (item: GeoTargetingItem) {
    let pinRef = this.componentsHelperService.getComponentRef(
      GeoTargetingModule,
      GeoTargetingPinComponent,
      {excluded: item.excluded}
    );

    let popupRef = this.componentsHelperService.getComponentRef(
      GeoTargetingModule,
      GeoTargetingMapPopupComponent,
      {item: item}
    );

    let pinElement: HTMLElement = pinRef.location.nativeElement;
    let svg                     = pinElement.querySelector('svg');

    let myIcon = L.divIcon({
      className:   'geo-targeting-map__pin',
      popupAnchor: [0, -35],
      html:        (<any>svg).outerHTML
    });

    pinRef.destroy();

    return L.marker([item.latitude, item.longitude], {icon: myIcon})
            .bindPopup(popupRef.location.nativeElement, {
              closeButton: false
            });
  }

  /**
   * Return radius layer (red or green depending on excluded flag) for passed item
   * @param item
   * @returns {Circle}
   */
  getRadiusLayer (item: GeoTargetingItem) {
    let radius = item.radius || 0;

    return L.circle([item.latitude, item.longitude], {
      color:  item.excluded ? '#f47564' : '#4d6aa4',
      weight: 1,
      radius: item.distance_unit === 'mile' ? radius * 1609.34 : radius * 1000
    });
  }

  /**
   * Return polygon layer for passed item
   * @param item
   * @returns {Polygon}
   */
  setPolygonsLayer (item: GeoTargetingItem) {
    // Set empty array when item.polygons is undefined
    let polygons         = item.polygons || [];
    let processedPolygon = polygons.map((coordinates) => {
      if (coordinates.length) {
        let newCoordinates = [];
        coordinates.forEach((coordinate) => {
          newCoordinates.push([coordinate.lat, coordinate.lng]);
        });
        return newCoordinates;
      } else {
        return [(<any>coordinates).lat, (<any>coordinates).lng];
      }
    });

    return L.polygon(processedPolygon, {
      color:  item.excluded ? '#f47564' : '#4d6aa4',
      weight: 1
    });
  }

  /**
   * Return tile url for current lang
   * @returns {string}
   */
  getTileUrl (lang = this.translateService.currentLang) {
    return `https://external.xx.fbcdn.net/map_tile.php?v=26&x={x}&y={y}&z={z}&size=512&ppi=250&language=${lang}`;
  }

  /**
   * Update tile layer url and redraw it
   * @param tileUrl
   * @param noRedraw
   */
  setTileUrl (tileUrl = this.getTileUrl(), noRedraw = false) {
    this.tileLayer.setUrl(tileUrl, noRedraw);
    this.tileLayer.redraw();
  }

  /**
   * Initialize map using default view
   */
  initializeMap () {

    this.map = L.map('geo-targeting-map', {
      center: [this.latitude, this.longitude],
      zoom:   this.zoom
    });

    this.tileLayer = L.tileLayer(this.getTileUrl(), {})
                      .addTo(this.map);

    this.popup = L.popup();
  }

  onMapClick = (e) => {
    let latitude  = e.latlng.lat;
    let longitude = e.latlng.lng;
    let key       = `(${latitude}, ${longitude})`;
    let pinItem   = (<GeoTargetingItem>{
      key:       key,
      name:      key,
      latitude:  latitude,
      longitude: longitude,
      type:      'custom_location'
    });
    this.geoTargetingSelectedService
        .setCoordinates(pinItem)
        .subscribe((item: GeoTargetingItem) => {
          // Show message if coordinates don't belong to any country (e.g. deep-deep ocean)
          if (!item.country_code) {
            let message = this.translateService.instant(`geo-targeting-input.INVALID_LOCATION`);

            this.geoTargetingInfoService.showInfo({message});

            return;
          }

          this._store.let(GeoTargetingModeService.getModel)
              .take(1)
              .subscribe(
                (model) => item.excluded = model.selectedMode.id === 'exclude'
              );

          this.geoTargetingSelectedService.add(item);

          this.togglePinMode();
        });
  };

  enterPinMode () {
    this.map.on('click', this.onMapClick);
  }

  exitPinMode () {
    this.map.off('click', this.onMapClick);
  }

  constructor (private _store: Store<AppState>,
               private translateService: TranslateService,
               private geoTargetingInfoService: GeoTargetingInfoService,
               private geoTargetingModeService: GeoTargetingModeService,
               private componentsHelperService: ComponentsHelperService,
               private geoTargetingSelectedService: GeoTargetingSelectedService) { }

}
