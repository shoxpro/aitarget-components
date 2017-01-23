import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector:        'fba-detailed-targeting-legend',
  template:        `
      <legend *ngIf="!first">
        <ng-content select=".fba-detailed-targeting-legend__label"></ng-content>
        <ng-content select="fba-info-icon"></ng-content>
        <ng-content select="fba-close"></ng-content>
      </legend>`,
  styles:          [`
                      legend {
                        position:       relative;
                        display:        block;
                        width:          100%;
                        font-size:      1.2rem;
                        color:          #7f7f7f;
                        font-weight:    bold;
                        padding:        0;
                        margin:         0;
                        border:         none;
                      }
                    `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingLegendComponent {
}
