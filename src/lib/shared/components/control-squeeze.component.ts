import { Component, ChangeDetectionStrategy, ContentChild, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlToken } from '../constants/form-control-token';
import { Subject } from 'rxjs';

@Component({
  selector:        'fba-control-squeeze',
  template:        `<div>
                      <div  class="fba-control-squeeze-value"
                            *ngIf="squeezeValueVisible"
                            (click)="toggleSqueezedValue()">
                        <div *dynamicComponent="squeezedValue"></div>
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
export class ControlSqueezeComponent implements OnInit, OnDestroy {
  destroy$            = new Subject();
  squeezeValueVisible = true;

  squeezedValue;

  @ContentChild(FormControlToken) control;

  toggleSqueezedValue () {
    this.squeezeValueVisible = !this.squeezeValueVisible;
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.control.squeezedValue$
        .takeUntil(this.destroy$)
        .subscribe((squeezedValue) => {
          this.squeezedValue = squeezedValue;
          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        });
  }

  constructor (private changeDetectorRef: ChangeDetectorRef) {

  }
}
