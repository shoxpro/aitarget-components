import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fb-arrow-drop',
  template: `<span class="fb-arrow-drop__wrapper">
                <svg xmlns="http://www.w3.org/2000/svg"
                     *ngIf="direction === 'down'"
                     class="fb-arrow-drop__svg fb-arrow-drop__svg_down"
                     fill="#4b4f56"
                     height="24"
                     viewBox="0 0 24 24"
                     width="24">
                  <path d="M7 10l5 5 5-5z"></path>
                  <path d="M0 0h24v24H0z"
                        fill="none"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg"
                     *ngIf="direction === 'up'"
                     class="fb-arrow-drop__svg fb-arrow-drop__svg_up"
                     fill="#4b4f56"
                     height="24"
                     viewBox="0 0 24 24"
                     width="24">
                  <path d="M7 14l5-5 5 5z"></path>
                  <path d="M0 0h24v24H0z"
                        fill="none"></path>
                </svg>
              </span>`,
  styles:   [`
              :host {
                position: relative;
                display:  inline-block;
                width:    14px;
                height:   14px;
              }
              .fb-arrow-drop__wrapper {
                position: relative;
                display:  inline-block;
                overflow: hidden;
                width:    14px;
                height:   14px;
              }
              .fb-arrow-drop__svg {
                position: absolute;
                top:      -4px;
                left:     -5px;
              }
              .fb-arrow-drop__svg_up {
                position: relative;
                top:      -2px;
              }
            `]
})
export class FbArrowDropComponent implements OnInit {

  @Input() direction: string = 'down';

  constructor () { }

  ngOnInit () {
  }

}
