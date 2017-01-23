import { Component, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { EventEmitter } from '@angular/common/src/facade/async';

interface Item { id: string|number; name: string; }

@Component({
  selector:        'fba-dropdown-list',
  templateUrl:     './dropdown-list.html',
  styleUrls:       ['./dropdown-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbDropdownListComponent {
  @Input() items: Array<Item>;
  @Input() selectedItem: Item;
  @Output() onClick = new EventEmitter();

  showInfo (listItem, showInfo) {
    listItem.showInfo = showInfo;
  }
}
