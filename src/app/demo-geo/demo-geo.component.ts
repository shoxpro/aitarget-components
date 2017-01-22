import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { targetingSpecInitial } from '../../lib/components/targeting/interfaces/targeting-spec.interface';

@Component({
  selector:        'fba-demo-geo',
  templateUrl:     './demo-geo.component.html',
  styleUrls:       ['demo-geo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoGeoComponent {

  hideGeo       = false;
  isSpecVisible = false;

  spec = targetingSpecInitial;

  showSpec (isVisible, event?) {
    if (event) {
      event.stopPropagation();
    }

    this.isSpecVisible = isVisible;

    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  constructor (private changeDetectorRef: ChangeDetectorRef) { }
}
