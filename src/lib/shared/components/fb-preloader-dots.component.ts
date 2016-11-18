import { Component } from '@angular/core';
import { PRELOADER_DOTS } from '../constants/data-urls.constants';

@Component({
  selector: 'fb-preloader-dots',
  template: `
            <!--suppress HtmlUnknownTarget -->
            <img src="${PRELOADER_DOTS}" alt="">
            `,
  styles:   [`
              :host {
                position: absolute;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background-color: #f2f6fa;
                opacity: 0.8;
              }
            `]
})
export class FbPreloaderDotsComponent {
}
