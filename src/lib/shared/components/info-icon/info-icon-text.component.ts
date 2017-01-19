import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector:        'fba-info-icon-text',
  template:        `<ng-content></ng-content>`,
  styles:          [`
                    :host {
                      position: relative;
                      display: block;
                      font-weight: normal;
                      margin-bottom: 5px;
                      line-height: 1.2em;
                      font-size: 12px;
                    }
`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoIconTextComponent {
}
