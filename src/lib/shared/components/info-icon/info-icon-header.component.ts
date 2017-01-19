import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector:        'fba-info-icon-header',
  template:        `<ng-content></ng-content>`,
  styles:          [`
                    :host {
                      position: relative;
                      display: block;
                      font-weight: bold;
                      font-size: 12px;
                      padding-bottom: 8px;
                      padding-top: 3px;
                      text-transform: uppercase;
                    }
`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoIconHeaderComponent {
}
