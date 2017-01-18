import { Component, Input } from '@angular/core';
import { DetailedItem } from '../detailed-item';
import { DetailedInfoService } from '../detailed-info/detailed-info.service';
import { DetailedSelectedService } from '../detailed-selected/detailed-selected.service';

@Component({
  selector:    'fba-detailed-items',
  templateUrl: 'detailed-items.component.html',
  styleUrls:   ['detailed-items.component.scss']
})
export class DetailedItemsComponent {

  @Input('items') items: Array<DetailedItem> = [];

  setDropdownInfoItem (item: DetailedItem) {
    this.detailedInfoService.update(item);
  }

  selectItem (item: DetailedItem) {
    let selectedItems = this.detailedSelectedService.get();

    let selectedItemsFiltered = selectedItems.filter(selected => {
      return selected.type === item.type && selected.id === item.id;
    });

    let alreadyAdded: boolean = Boolean(selectedItemsFiltered.length);

    if (!alreadyAdded) {
      selectedItems.unshift(item);
    }

    this.detailedSelectedService.updateSelected(selectedItems);
  }

  constructor (private detailedInfoService: DetailedInfoService,
               private detailedSelectedService: DetailedSelectedService) { }
}
