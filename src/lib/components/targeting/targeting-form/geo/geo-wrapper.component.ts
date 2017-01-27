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

  ngModelChange (geoSpec: TargetingSpec) {
    if (isEqual(this.spec['geo_locations'], geoSpec['geo_locations']) &&
      isEqual(this.spec['excluded_geo_locations'], geoSpec['excluded_geo_locations'])) {
      return;
    }

    this.onChange.emit(geoSpec);
  }
}
