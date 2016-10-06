import { Injectable } from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';
import * as L from 'leaflet';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class GeoTargetingMapService {
  private map;
  private _mapActive = new BehaviorSubject<boolean>(false);
  public mapActive   = this._mapActive.asObservable();
  private zoom       = 1;
  private latitude   = 51.505;
  private longitude  = -0.09;
  public itemsMap    = {};

  /**
   * Show map
   */
  public showMap () {
    this._mapActive.next(true);
  }

  /**
   * Hide map
   */
  public hideMap () {
    this._mapActive.next(false);
  }

  /**
   * Create all item's layers, combine them to feature group and add this group to the map
   * @param item
   */
  public drawItem (item: GeoTargetingItem) {
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
  public focusItem (item: GeoTargetingItem) {
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
  public setView (latitude = this.latitude, longitude = this.longitude, zoom = this.zoom) {
    this.map.setView([latitude, longitude], zoom);
  }

  /**
   * Return green or red customized marker layer for included or excluded item
   * @param item
   * @returns {Marker}
   */
  public getMarkerLayer (item: GeoTargetingItem) {
    // noinspection TsLint
    let pin = `<svg xmlns="http://www.w3.org/2000/svg"
                         fill="#67ba2f"
                         height="48"
                         viewBox="0 0 24 24"
                         width="48">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                    </svg>`;

    if (item.excluded) {
      // noinspection TsLint
      pin = `<svg xmlns="http://www.w3.org/2000/svg"
                 fill="#f47564"
                 height="48"
                 viewBox="0 0 24 24"
                 width="48">
              <path d="M12 6.5c1.38 0 2.5 1.12 2.5 2.5 0 .74-.33 1.39-.83 1.85l3.63 3.63c.98-1.86 1.7-3.8 1.7-5.48 0-3.87-3.13-7-7-7-1.98 0-3.76.83-5.04 2.15l3.19 3.19c.46-.52 1.11-.84 1.85-.84zm4.37 9.6l-4.63-4.63-.11-.11L3.27 3 2 4.27l3.18 3.18C5.07 7.95 5 8.47 5 9c0 5.25 7 13 7 13s1.67-1.85 3.38-4.35L18.73 21 20 19.73l-3.63-3.63z"></path>
            </svg>`;
    }

    let myIcon = L.divIcon({
      className: 'geo-targeting-map__pin',
      html:      pin
    });

    return L.marker([item.latitude, item.longitude], {icon: myIcon});
  }

  /**
   * Return radius layer (red or green depending on excluded flag) for passed item
   * @param item
   * @returns {Circle}
   */
  public getRadiusLayer (item: GeoTargetingItem) {
    return L.circle([item.latitude, item.longitude], {
      color:  item.excluded ? '#f47564' : '#4d6aa4',
      weight: 1,
      radius: item.distance_unit === 'mile' ? item.radius * 1609.34 : item.radius * 1000
    });
  }

  /**
   * Return polygon layer for passed item
   * @param item
   * @returns {Polygon}
   */
  public setPolygonsLayer (item: GeoTargetingItem) {
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
   * Initialize map using default view
   */
  public initializeMap () {
    let lang    = this.TranslateService.currentLang;
    let tileUrl = `https://external.xx.fbcdn.net/map_tile.php?v=26&x={x}&y={y}&z={z}&size=512&ppi=250&language=${lang}`;

    this.map = L.map('geo-targeting-map', {
      center: [this.latitude, this.longitude],
      zoom:   this.zoom
    });

    L.tileLayer(tileUrl, {})
     .addTo(this.map);
  }

  constructor (private TranslateService: TranslateService) { }

}
