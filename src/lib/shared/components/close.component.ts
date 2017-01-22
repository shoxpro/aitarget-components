import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fba-close',
  template: `<span (click)="onClose.emit($event)">&times;</span>`,
  styles:   [`
            :host {
              position:            absolute;
              top:                 5px;
              right:               5px;
              padding:             0 5px;
              color:               #bdc0c8;
              font-weight:         bold;
              font-size:           15px;
              cursor:              pointer;
              -webkit-user-select: none;
              -moz-user-select:    none;
              -ms-user-select:     none;
            }
            
            :host:hover {
              color: #9b9ea6;
            }
            `]
})
export class CloseComponent {
  @Output() onClose = new EventEmitter();
}
