import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TargetingSpec } from '../../interfaces/targeting-spec.interface';

const isEqual = require('lodash/isEqual');

/**
 * Proxy component to be downgraded in angular1.
 */
@Component({
  selector:        'fba-geo-wrapper',
  template:        `<fba-geo [ngModel]="spec" (ngModelChange)="ngModelChange($event)"></fba-geo>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoWrapperComponent {
  @Input() spec: TargetingSpec;
  @Output() onChange: EventEmitter<TargetingSpec> = new EventEmitter();

  ngModelChange (spec: TargetingSpec) {
    const updatedSpec = Object.assign({}, this.spec, spec);

    if (isEqual(updatedSpec, this.spec)) {
      return;
    }

    this.onChange.emit(updatedSpec);
  }
}
