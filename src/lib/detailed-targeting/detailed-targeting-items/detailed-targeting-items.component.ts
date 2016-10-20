import { Component, OnInit, Input } from '@angular/core';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingSelectedService } from '../detailed-targeting-selected/detailed-targeting-selected.service';

@Component({
  selector:    'detailed-targeting-items',
  templateUrl: './detailed-targeting-items.component.html',
  styleUrls:   ['./detailed-targeting-items.component.css']
})
export class DetailedTargetingItemsComponent implements OnInit {

  @Input('items') items: Array<DetailedTargetingItem> = [];

  setDropdownInfoItem (item: DetailedTargetingItem) {
    this.detailedTargetingInfoService.update(item);
  }

  selectItem (item: DetailedTargetingItem) {
    let selectedItems = this.detailedTargetingSelectedService.get();

    let selectedItemsFiltered = selectedItems.filter(selected => {
      return selected.type === item.type && selected.id === item.id;
    });

    let alreadyAdded: boolean = Boolean(selectedItemsFiltered.length);

    if (!alreadyAdded) {
      selectedItems.push(item);
    }

    this.detailedTargetingSelectedService.updateSelected(selectedItems);
  }

  constructor (private detailedTargetingInfoService: DetailedTargetingInfoService,
               private detailedTargetingSelectedService: DetailedTargetingSelectedService) { }

  ngOnInit () {
  }

}
