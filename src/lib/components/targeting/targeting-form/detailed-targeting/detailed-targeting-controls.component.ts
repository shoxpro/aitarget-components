import {
  Component, ChangeDetectionStrategy, Output, EventEmitter, Input, ChangeDetectorRef, OnChanges
} from '@angular/core';

@Component({
  selector:        'fba-detailed-targeting-controls',
  template:        `<div class="fba-detailed-targeting__controls">
                      <template ngFor let-control [ngForOf]="controls" let-last="last">
                        <a href=""
                           (click)="addControl.emit(control.key)">
                          {{control.translationKey | translate}}
                        </a>
                        <span *ngIf="!last">{{'fba-detailed-targeting-controls.OR' | translate}}</span>
                      </template>
                    </div>
                    `,
  styles:          [`
                      :host {
                        position: relative;
                        display: block;
                        font-size:   1.2rem;
                      }
                      
                      a {
                        color: #50a9c9;
                      }
                    `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingControlsComponent implements OnChanges {
  excludeControl       = {
    key:            'exclusions',
    translationKey: 'fba-detailed-targeting-controls.EXCLUDE'
  };
  narrowControl        = {
    key:            'flexible_spec',
    translationKey: 'fba-detailed-targeting-controls.NARROW'
  };
  narrowFurtherControl = {
    key:            'flexible_spec',
    translationKey: 'fba-detailed-targeting-controls.NARROW_FURTHER'
  };

  controls = [this.excludeControl];

  @Input() formValue;
  @Output() addControl = new EventEmitter();

  ngOnChanges (changes) {
    const formValue = changes.formValue.currentValue;

    if (!formValue) {
      return;
    }

    this.controls = [];

    if (!formValue.hasOwnProperty('exclusions')) {
      this.controls.push(this.excludeControl);
    }

    // Flexible spec is valid if it has at least 1 filled key
    const validFlexibleSpecs = formValue['flexible_spec'].filter((flexibleSpec) => {
      return Object.keys(flexibleSpec).length > 0;
    }, 0);

    if (formValue['flexible_spec'].length === validFlexibleSpecs.length && validFlexibleSpecs.length > 0) {
      const control = validFlexibleSpecs.length === 1 ? this.narrowControl : this.narrowFurtherControl;
      this.controls.push(control);
    }

    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  constructor (private changeDetectorRef: ChangeDetectorRef) {}
}
