import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TargetingSpec } from '../../interfaces/targeting-spec.interface';
import { DetailedTargetingSpec, detailedSpecInitial } from '../../interfaces/targeting-spec-detailed.interface';
import isEqual from 'lodash-es/isEqual';

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

  ngModelChange (detailedSpec: DetailedTargetingSpec) {
    if (isEqual(this.spec['flexible_spec'], detailedSpec['flexible_spec']) &&
      isEqual(this.spec['exclusions'], detailedSpec['exclusions'])) {
      return;
    }

    /*All old keys of detailedSpecInitial should be cleared,
     because now they are inside flexible_spec*/
    this.onChange.emit(Object.assign({}, detailedSpecInitial, detailedSpec));
  }
}
