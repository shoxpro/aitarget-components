import { Component, Input } from '@angular/core';
// TODO: Replace it with md-icon component
@Component({
  selector: 'geo-targeting-info-icon',
  template: `
    <!--error icon-->
    <div class="geo-targeting-info__icon geo-targeting-info__icon_error"
         *ngIf="level === 'error'">
      <svg xmlns="http://www.w3.org/2000/svg"
           fill="#f47564"
           height="24"
           viewBox="0 0 24 24"
           width="24">
        <path d="M0 0h24v24H0z"
              fill="none"></path>
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
      </svg>
    </div>
    <!--Info icon-->
    <div class="geo-targeting-info__icon geo-targeting-info__icon_info"
         *ngIf="level === 'info'">
      <svg xmlns="http://www.w3.org/2000/svg"
           fill="#50a9c9"
           height="20"
           viewBox="0 0 24 24"
           width="20">
        <path d="M0 0h24v24H0z"
              fill="none"></path>
        <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12
        2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path>
      </svg>
    </div>`,
  styles:   [`:host {
                display:    inline-block;
                height:     24px;
                padding:    5px;
                width:      24px;
                box-sizing: content-box;
              }`]
})
export class GeoTargetingInfoIconComponent {
  @Input() level = 'info';
}
