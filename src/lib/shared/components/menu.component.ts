import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/common/src/facade/async';

interface MenuItem {
  id: number;
  name: string;
}

@Component({
  selector: 'fba-menu',
  template: `
              <button class="fba-menu__button"
                      [disabled]="disabled"
                      (click)="isOpen = !isOpen">
                {{ menuButtonName }}
              </button>
              <fba-dropdown-list
                class="fba-menu__dropdown-list"
                *ngIf="isOpen && menuItems?.length > 0"
                (fbaClickOutside)="isOpen = !isOpen"
                [items]="menuItems"
                (onClick)="select($event)"></fba-dropdown-list>`,
  styles: [`
    :host {
      position: relative;
      display: inline-block;
    }

    .fba-menu__button {
      background:    #ffffff;
      border:        solid 1px #cccccc;
      color:         #333333;
      border-radius: 3px;
      display:       inline-block;
      box-sizing:    border-box;
      height:        30px;
      line-height:   30px;
      padding:       0 8px;
      white-space:   nowrap;
      font-size:     12px;
      font-weight:   600;
      cursor:        pointer;
      user-select:   none;
      vertical-align: middle;
      outline: none;
    }

    .fba-menu__dropdown-list {
      min-width: 100%;
      top: 33px;
    }
  `]
})

export class FbaMenuComponent {
  isOpen = false;

  @Input() menuButtonName: string;
  @Input() menuItems: MenuItem [];
  @Input() disabled: boolean;
  @Output() onClick = new EventEmitter();

  select (item) {
    this.isOpen = !this.isOpen;
    this.onClick.emit(item);
  }
}
