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
                        position:    relative;
                        display:     block;
                        width:       100%;
                        font-size:   1.2rem;
                        color:       #7f7f7f;
                        font-weight: bold;
                        padding:     10px 0;
                      }
                      
                      fba-close {
                        font-size: 1.8rem;
                        padding:   0;
                        right:     0;
                      }
                    `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingLegendComponent {
}
