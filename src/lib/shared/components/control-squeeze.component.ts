import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlToken } from '../constants/form-control-token';

@Component({
  selector:        'fba-control-squeeze',
  template:        `<div>
                      <div  class="fba-control-squeeze-value"
                            *ngIf="squeezeValueVisible"
                            (click)="toggleSqueezedValue()">
                        <div *dynamicComponent="control.squeezedValue$ | async"></div>
                      </div>
                      <div *ngIf="!squeezeValueVisible" (clickOutside)="toggleSqueezedValue()">
                        <ng-content></ng-content>
                      </div>
                    </div>`,
  styles:          [`
                      .fba-control-squeeze-value {
                        display: flex;
                        align-items: center;
                        background-color: #f5fafd;
                        border: 1px solid #d9dfe7;
                        border-radius: 3px;
                        cursor: pointer;
                        min-height: 32px;
                        padding: 5px;
                        box-sizing: border-box;
                      }
                    `],
  providers:       [{
    provide:     NG_VALUE_ACCESSOR,
    useExisting: ControlSqueezeComponent,
    multi:       true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlSqueezeComponent {
  squeezeValueVisible = false;

  @ContentChild(FormControlToken) control;

  toggleSqueezedValue () {
    this.squeezeValueVisible = !this.squeezeValueVisible;
  }
}
