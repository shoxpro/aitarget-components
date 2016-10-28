import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/common/src/facade/async';

interface Item { id: string|number; name: string; }

@Component({
  selector:    'fb-dropdown-list',
  templateUrl: './fb-dropdown-list.html',
  styleUrls:   ['./fb-dropdown-list.scss']
})
export class FbDropdownListComponent {
  @Input() items: Array<Item>;
  @Input() selectedItem: Item;
  @Output() onClick = new EventEmitter();

  showInfo (item, showInfo) {
    item.showInfo = showInfo;
  }

  constructor () {}
}
