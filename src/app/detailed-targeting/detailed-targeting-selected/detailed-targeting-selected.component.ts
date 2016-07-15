import { Component, OnInit } from '@angular/core';
import { TargetingSpecService, TargetingSpec } from '../../targeting/targeting-spec.service';
import { DetailedTargetingSelectedService } from './detailed-targeting-selected.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';

@Component({
  moduleId: module.id,
  selector: 'detailed-targeting-selected',
  templateUrl: 'detailed-targeting-selected.component.html',
  styleUrls: ['detailed-targeting-selected.component.css']
})
export class DetailedTargetingSelectedComponent implements OnInit {

  public spec: TargetingSpec;
  public items: DetailedTargetingItem[];

  public structuredSelectedMap: Object;
  public structuredSelectedKeys: string[];

  constructor (private TargetingSpecService: TargetingSpecService,
               private DetailedTargetingSelectedService: DetailedTargetingSelectedService) {}

  public removeGroup (key) {
    let selectedItems = this.DetailedTargetingSelectedService.get();
    let idsToRemove = this.structuredSelectedMap[key].map(item => item.id);

    selectedItems = selectedItems.filter(item => idsToRemove.indexOf(item.id) === -1);

    this.DetailedTargetingSelectedService.updateSelected(selectedItems);
  }

  public removeItem (itemToRemove: DetailedTargetingItem) {
    let selectedItems = this.DetailedTargetingSelectedService.get();

    selectedItems = selectedItems.filter(item => item.id !== itemToRemove.id);

    this.DetailedTargetingSelectedService.updateSelected(selectedItems);
  }

  ngOnInit () {
    this.TargetingSpecService.spec.subscribe((spec: TargetingSpec) => {
      this.spec = spec;
      console.log('Targeting Spec: ', this.spec);
    });
    this.DetailedTargetingSelectedService.items.subscribe((items: DetailedTargetingItem[]) => {
      this.items = items;
      let structuredSelectedData = this.DetailedTargetingSelectedService.getStructuredSelectedData();
      this.structuredSelectedKeys = structuredSelectedData.keys;
      this.structuredSelectedMap = structuredSelectedData.map;
      this.TargetingSpecService.updateWithDetailedTargeting(this.items);
    });

  }

}
