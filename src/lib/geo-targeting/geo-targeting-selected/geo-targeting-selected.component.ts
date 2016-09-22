import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeoTargetingSelectedService } from './geo-targeting-selected.service';
import { GeoTargetingItem } from '../geo-targeting-item.interface';

@Component({
  selector:    'geo-targeting-selected',
  templateUrl: './geo-targeting-selected.component.html',
  styleUrls:   ['./geo-targeting-selected.component.css']
})
export class GeoTargetingSelectedComponent implements OnInit, OnDestroy {
  private items: GeoTargetingItem[];
  private subscriptions = [];

  constructor (private GeoTargetingSelectedService: GeoTargetingSelectedService) { }

  public removeItem (item: GeoTargetingItem) {
    this.GeoTargetingSelectedService.remove(item);
  }

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this.subscriptions.push(
      this.GeoTargetingSelectedService.items.subscribe((items: GeoTargetingItem[]) => {
        this.items = items;
      })
    );
  }

}
