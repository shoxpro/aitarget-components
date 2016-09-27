import { Component, OnInit, Input } from '@angular/core';
import { GeoTargetingItem } from '../geo-targeting-item.interface';

@Component({
  selector:    'geo-targeting-radius',
  templateUrl: './geo-targeting-radius.component.html',
  styleUrls:   ['./geo-targeting-radius.component.css']
})
export class GeoTargetingRadiusComponent implements OnInit {

  @Input('item') item: GeoTargetingItem = {key: ''};

  private isOpen: boolean = false;

  public toggle () {
    this.isOpen = !this.isOpen;
  }

  constructor () { }

  ngOnInit () {
    console.log(`this.item`, this.item);
  }

}
