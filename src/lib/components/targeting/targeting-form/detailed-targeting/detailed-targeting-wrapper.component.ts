import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TargetingSpec } from '../../interfaces/targeting-spec.interface';

const isEqual = require('lodash/isEqual');

/**
 * Proxy component to be downgraded in angular1.
 */
@Component({
  selector:        'fba-detailed-targeting-wrapper',
  template:        `<fba-detailed-targeting
               [ngModel]="spec"
               (ngModelChange)="ngModelChange($event)"
               [adaccountId]="adaccountId"></fba-detailed-targeting>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingWrapperComponent {
  @Input() spec: TargetingSpec                    = {};
  @Input() adaccountId;
  @Output() onChange: EventEmitter<TargetingSpec> = new EventEmitter();

  ngModelChange (spec: TargetingSpec) {
    const updatedSpec = Object.assign({}, this.spec, spec);

    if (isEqual(updatedSpec, this.spec)) {
      return;
    }

    this.onChange.emit(updatedSpec);
  }
}
