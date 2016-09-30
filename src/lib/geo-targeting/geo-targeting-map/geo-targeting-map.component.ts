import { TranslateService } from 'ng2-translate/ng2-translate';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector:      'geo-targeting-map',
  templateUrl:   './geo-targeting-map.component.html',
  styleUrls:     ['./geo-targeting-map.component.css', '../../../../node_modules/leaflet/dist/leaflet.css'],
  encapsulation: ViewEncapsulation.None
})
export class GeoTargetingMapComponent implements OnInit {
  private map;

  constructor (private TranslateService: TranslateService) {
    console.log(`L: `, L);
  }

  ngOnInit () {
    let lang    = this.TranslateService.currentLang;
    let tileUrl = `https://external.xx.fbcdn.net/map_tile.php?v=26&x={x}&y={y}&z={z}&size=512&ppi=250&language=${lang}`;

    this.map = L.map('geo-targeting-map')
                .setView([51.505, -0.09], 13);

    L.tileLayer(tileUrl, {
      attribution: ''
    })
     .addTo(this.map);
  }

}
