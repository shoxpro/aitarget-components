import { Component, ChangeDetectionStrategy, ContentChild, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlToken } from '../constants/form-control-token';
import { Subject } from 'rxjs/Subject';

@Component({
  selector:        'fba-control-squeeze',
  template:        `<div>
                      <div  class="fba-control-squeeze-value"
                            *ngIf="squeezeValueVisible"
                            (click)="toggleSqueezedValue($event)">
                        <div *dynamicComponent="squeezedValue"></div>
                      </div>
                      <div *ngIf="!squeezeValueVisible" (fbaClickOutside)="toggleSqueezedValue($event)">
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
                        font-size: 1.4rem;
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

  toggleSqueezedValue (event) {
    event.stopPropagation();
    this.squeezeValueVisible = !this.squeezeValueVisible;
    // Focus inner control
    if (!this.squeezeValueVisible) {
      this.control.focus();
    }
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.control.squeezedValue$
        .takeUntil(this.destroy$)
        .subscribe((squeezedValue) => {
          setTimeout(() => {
            this.squeezedValue = squeezedValue;
            this.changeDetectorRef.markForCheck();
            this.changeDetectorRef.detectChanges();
          });
        });
  }

  constructor (private changeDetectorRef: ChangeDetectorRef) {

  }
}
