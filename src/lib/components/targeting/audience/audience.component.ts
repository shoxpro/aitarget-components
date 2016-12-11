import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, ViewEncapsulation, OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { AudienceState, audienceInitial } from './audience.interface';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector:        'fba-audience',
  templateUrl:     'audience.html',
  styleUrls:       ['audience.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:   ViewEncapsulation.None
})
export class AudienceComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  @Input() audience: AudienceState;
  @Input() index: number;
  @Input() audienceEditIndex: number | null;
  @Output() updateAudience = new EventEmitter();
  @Output() editAudience   = new EventEmitter();

  bidMin = 0;
  bidMax;
  bidMedian;

  bidValidators = [
    (control) => {
      return !control.value ?
        {
          required: `Enter bid or use auto bid`
        } : null;
    },
    (control) => {
      return control.value < this.bidMin ?
        {
          min: `Bid should be in a range between ${this.bidMin} and ${this.bidMax} that is recommended by Facebook`
        } : null;
    },
    (control) => {
      return control.value > this.bidMax ?
        {
          max: `Bid should be in a range between ${this.bidMin} and ${this.bidMax} that is recommended by Facebook`
        } : null;
    }
  ];

  audienceForm: FormGroup = this.formBuilder.group({
    name:    this.formBuilder.control({value: audienceInitial.name, disabled: false}, [
      (control) => {
        return !control.value ?
          {
            required: `Name is required`
          } : null;
      }
    ]),
    active:  this.formBuilder.control(audienceInitial.active, [Validators.required]),
    bid:     this.formBuilder.control(audienceInitial.bid, []),
    bidAuto: this.formBuilder.control(audienceInitial.bidAuto, [Validators.required]),
    budget:  this.formBuilder.control(audienceInitial.budget, [
      (control) => {
        return control.value <= 0 ?
          {
            required: `Budget is required and should be greater than zero`
          } : null;
      }
    ])
  });

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.audienceForm.patchValue(this.audience);

    this.bidMin    = this.audience.reachestimate.bid_estimations[0].bid_amount_min / 100;
    this.bidMax    = this.audience.reachestimate.bid_estimations[0].bid_amount_max / 100;
    this.bidMedian = this.audience.reachestimate.bid_estimations[0].bid_amount_median / 100;

    /**
     * Process bid changes, toggle bidAuto and validators when changed
     */
    this.audienceForm
        .get('bid')
        .valueChanges
        .subscribe((bid) => {
          this.audienceForm.get('bidAuto')
              .patchValue(!bid, {emitEvent: false});
          this.audienceForm.get('bid')
              .setValidators(bid ? this.bidValidators : null);
          this.audienceForm.get('bid')
              .updateValueAndValidity({emitEvent: false});
        });

    /**
     * Process bidAuto, toggle bid validators and its value
     */
    this.audienceForm
        .get('bidAuto')
        .valueChanges
        .subscribe((bidAuto) => {
          this.audienceForm.get('bid')
              .patchValue(null, {emitEvent: false});
          this.audienceForm.get('bid')
              .setValidators(bidAuto ? null : this.bidValidators);
          this.audienceForm.get('bid')
              .updateValueAndValidity({emitEvent: false});
        });

    /**
     * Disable controls when active flag change
     */
    this.audienceForm
        .get('active')
        .valueChanges
        .subscribe((active) => {
          this.audienceForm.get('name')
              .reset({value: this.audience.name, disabled: !active}, {emitEvent: false});
          this.audienceForm.get('bid')
              .reset({value: this.audience.bid, disabled: !active}, {emitEvent: false});
          this.audienceForm.get('bidAuto')
              .reset({value: this.audience.bidAuto, disabled: !active}, {emitEvent: false});
          this.audienceForm.get('budget')
              .reset({value: this.audience.budget, disabled: !active}, {emitEvent: false});
        });

    /**
     * Process form changes.
     * Update local audience, detectChanges and trigger updateAudience.
     */
    this.audienceForm
        .valueChanges
        .takeUntil(this.destroy$)
        .subscribe((formValue) => {
          this.audience = Object.assign({}, this.audience,
            formValue, {
              valid: this.audienceForm.valid
            });

          this.updateAudience.emit({index: this.index, audience: this.audience});

          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        });
  }

  constructor (private changeDetectorRef: ChangeDetectorRef,
               private formBuilder: FormBuilder) {}
}
