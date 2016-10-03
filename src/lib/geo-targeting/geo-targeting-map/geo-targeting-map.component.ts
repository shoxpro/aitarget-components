import { TranslateService } from 'ng2-translate/ng2-translate';
import {
  Component, OnInit, ViewEncapsulation, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import * as L from 'leaflet';
import { GeoTargetingMapService } from './geo-targeting-map.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';

@Component({
  selector:        'geo-targeting-map',
  templateUrl:     './geo-targeting-map.component.html',
  styleUrls:       ['./geo-targeting-map.component.css', '../../../../node_modules/leaflet/dist/leaflet.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:   ViewEncapsulation.None
})
export class GeoTargetingMapComponent implements OnInit, OnDestroy {
  private map;
  private zoom           = 5;
  private _subscriptions = [];
  private polygon;
  private marker;
  private radius;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  // private updateTemplate () {
  //   this.ChangeDetectorRef.markForCheck();
  //   this.ChangeDetectorRef.detectChanges();
  // }

  private setView (latitude = 51.505, longitude = -0.09, zoom = this.zoom) {
    return this.map.setView([latitude, longitude], zoom);
  }

  private setMarker (latitude, longitude) {
    // noinspection TsLint
    let myIcon = L.divIcon({
      className: 'geo-targeting-map__pin',
      html:      `<svg xmlns="http://www.w3.org/2000/svg"
                       fill="#67ba2f"
                       height="48"
                       viewBox="0 0 24 24"
                       width="48">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                  </svg>`
    });

    return L.marker([latitude, longitude], {icon: myIcon})
            .addTo(this.map);
  }

  private setRadius (latitude, longitude, radius = 0, distance_unit = 'mile') {
    return L.circle([latitude, longitude], {
      color:  '#4d6aa4',
      weight: 1,
      radius: distance_unit === 'mile' ? radius * 1609.34 : radius * 1000
    })
            .addTo(this.map);
  }

  private setPolygons (polygons = []) {
    let processedPolygon = polygons.map((coordinates) => {
      if (coordinates.length) {
        let newCoordinates = [];
        coordinates.forEach((coordinate) => {
          newCoordinates.push([coordinate.lat, coordinate.lng]);
        });
        return newCoordinates;
      } else {
        return [coordinates.lat, coordinates.lng];
      }
    });

    return L.polygon(processedPolygon, {
      color:  '#4d6aa4',
      weight: 1
    })
            .addTo(this.map);
  }

  private fitBounds (marker, polygon, radius) {
    let group = L.featureGroup([marker, polygon, radius]);

    this.map.fitBounds(group.getBounds());
  }

  private initializeMap (latitude = 51.505, longitude = -0.09, zoom = 13) {
    let lang    = this.TranslateService.currentLang;
    let tileUrl = `https://external.xx.fbcdn.net/map_tile.php?v=26&x={x}&y={y}&z={z}&size=512&ppi=250&language=${lang}`;

    this.map = L.map('geo-targeting-map');

    this.setView(latitude, longitude, zoom);
    this.setMarker(latitude, longitude);

    L.tileLayer(tileUrl, {})
     .addTo(this.map);
  }

  constructor (private TranslateService: TranslateService,
               private ChangeDetectorRef: ChangeDetectorRef,
               private GeoTargetingMapService: GeoTargetingMapService) {
    console.log(`L: `, L);
  }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this.initializeMap();

    this._subscriptions.push(
      this.GeoTargetingMapService.item
          .filter((item: GeoTargetingItem) => {
            return Boolean(item.latitude && item.longitude);
          })
          .subscribe((item: GeoTargetingItem) => {
            console.log('show on map: ', item);
            this.setView(item.latitude, item.longitude);
            this.marker  = this.setMarker(item.latitude, item.longitude);
            this.polygon = this.setPolygons(item.polygons);
            this.radius  = this.setRadius(item.latitude, item.longitude, item.radius, item.distance_unit);
            this.fitBounds(this.marker, this.polygon, this.radius);
          })
    );
  }

}
