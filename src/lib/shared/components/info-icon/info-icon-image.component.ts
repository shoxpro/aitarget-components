import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector:        'fba-info-icon-image',
  template:        `<ng-content></ng-content>`,
  styles:          [`
                    :host {
                      position: relative;
                      display: block;
                      text-align: center;
                      margin-bottom: 5px;
                    }
`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoIconImageComponent {
}
