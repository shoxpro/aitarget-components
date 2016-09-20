import { Component, OnInit } from '@angular/core';
import { GeoTargetingDropdownService } from './geo-targeting-dropdown.service';

@Component({
  selector:    'geo-targeting-dropdown',
  templateUrl: './geo-targeting-dropdown.component.html',
  styleUrls:   ['./geo-targeting-dropdown.component.css']
})
export class GeoTargetingDropdownComponent implements OnInit {

  private subscriptions = [];
  private items;

  public selectItem (item) {
    console.info(`Select item:`, item);
  }

  constructor (private GeoTargetingDropdownService: GeoTargetingDropdownService) { }

  ngOnInit () {
    this.subscriptions.push(
      this.GeoTargetingDropdownService.items.subscribe((items) => {
        this.items = items;
      })
    );
  }

}
