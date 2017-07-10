import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/common/src/facade/async';

export interface Item { id: string | number; name: string; }

@Component({
  selector:        'fba-dropdown-list',
  templateUrl:     './dropdown-list.html',
  styleUrls:       ['./dropdown-list.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FbDropdownListComponent {
  selectedItems = {};
  noTick        = true;

  @Input() items: Array<Item>;

  @Input()
  set selectedItem (value: Item | Item[]) {
    this.selectedItems = {};
    if (Array.isArray(value)) {
      value.forEach((item) => {
        this.selectedItems[item.id] = item;
      });
    } else {
      this.selectedItems[value.id] = value;
    }

    this.noTick = !(<any[]>Object.values(this.selectedItems)).length;
    console.log('noTick', this.noTick);
  }

  @Input() multiple: Boolean = false;
  @Output() onClick          = new EventEmitter();

  select (item) {
    if (this.multiple) {
      if (this.selectedItems[item.id]) {
        delete this.selectedItems[item.id];
      } else {
        this.selectedItems[item.id] = item;
      }
      this.onClick.emit(Object.values(this.selectedItems));
    } else {
      this.onClick.emit(item);
    }
  }

  showInfo (listItem, showInfo) {
    listItem.showInfo = showInfo;
  }
}
