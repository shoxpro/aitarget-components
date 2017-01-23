import { Component } from '@angular/core';

@Component({
  selector: 'fba-tick',
  template: `<svg xmlns="http://www.w3.org/2000/svg"
               fill="#07a0cf"
               height="18"
               viewBox="0 0 24 24"
               width="18">
                <path d="M0 0h24v24H0z"
                      fill="none"></path>
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
              </svg>`,
  styles:   [`:host {display: inline-block;width: 18px;height: 18px;}`]
})
export class TickComponent {
}
