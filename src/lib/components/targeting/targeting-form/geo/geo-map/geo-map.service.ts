import { Injectable } from '@angular/core';
import { GeoItem } from '../geo-item.interface';
import * as L from 'leaflet';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { BehaviorSubject } from 'rxjs/Rx';
import { GeoInfoService } from '../geo-info/geo-info.service';
import { GeoSelectedService } from '../geo-selected/geo-selected.service';
import { GeoModeService } from '../geo-mode/geo-mode.service';
import { GeoModule } from '../geo.module';
import { GeoPinComponent } from '../geo-pin/geo-pin.component';
import { GeoMapPopupComponent } from '../geo-map-popup/geo-map-popup.component';
import { AppState } from '../../../../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoApiService } from '../geo-api/geo-api.service';
import { ComponentsHelperService } from '../../../../../shared/services/components-helper.service';

@Injectable()
export class GeoMapService {
  map;
  _pinMode  = new BehaviorSubject<boolean>(false);
  zoom      = 1;
  latitude  = 51.505;
  longitude = -0.09;
  tileLayer;
  popup;

  itemsMap = {};
  pinMode  = this._pinMode.asObservable();

  /**
   * Toggle pin mode
   */
  togglePinMode () {
    let pinMode = this._pinMode.getValue();
    this._pinMode.next(!pinMode);
  }

  /**
   * Create all item's layers, combine them to feature group and add this group to the map
   * @param item
   */
  drawItem (item: GeoItem) {
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
  focusItem (item: GeoItem) {
    // Draw item if is not drown or has no layers
    if (!this.itemsMap[item.key] || !this.itemsMap[item.key].featureGroup.getLayers().length) {
      this.drawItem(item);
    }

    if (item.type === 'country_group') {
      this.setView(item.latitude, item.longitude);
      // Show message
      this.geoInfoService.showInfo({
        message: this.translateService.instant(`fba-geo-map.COUNTRY_GROUP`, {
          name: item.name
        })
      });
    } else {
      this.map.fitBounds(this.itemsMap[item.key].featureGroup.getBounds());
    }
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
  getMarkerLayer (item: GeoItem) {
    let pinRef = this.componentsHelperService.getComponentRef(
      GeoModule,
      GeoPinComponent,
      {excluded: item.excluded}
    );

    let popupRef = this.componentsHelperService.getComponentRef(
      GeoModule,
      GeoMapPopupComponent,
      {item: item}
    );

    let pinElement: HTMLElement = pinRef.location.nativeElement;
    let svg                     = pinElement.querySelector('svg');

    let myIcon = L.divIcon({
      className:   'fba-geo-map__pin',
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
  getRadiusLayer (item: GeoItem) {
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
  setPolygonsLayer (item: GeoItem) {
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
  initializeMap (mapContainerElement: HTMLHtmlElement) {

    if (this.map) {
      this.map.remove();
    }

    this.map = L.map(mapContainerElement, {
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

    this.geoApiService.metaData({custom_locations: [key]})
        .map((metaData) => {
          if (!metaData) {
            return;
          }
          return Object.values(metaData['custom_locations'])[0];
        })
        .filter((item) => Boolean(item))
        .subscribe((item: GeoItem) => {
          // Show message if coordinates don't belong to any country (e.g. deep-deep ocean)
          if (!item.country_code) {
            let message = this.translateService.instant(`fba-geo-input.INVALID_LOCATION`);

            this.geoInfoService.showInfo({message});

            return;
          }

          this._store.let(this.geoModeService.getModel)
              .take(1)
              .subscribe(
                (model) => item.excluded = model.selectedMode.id === 'exclude'
              );

          this.geoSelectedService.addItems([item]);

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
               private geoInfoService: GeoInfoService,
               private geoApiService: GeoApiService,
               private componentsHelperService: ComponentsHelperService,
               private geoModeService: GeoModeService,
               private geoSelectedService: GeoSelectedService) {}

}
