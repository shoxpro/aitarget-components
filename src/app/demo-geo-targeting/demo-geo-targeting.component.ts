import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { targetingSpecInitial } from '../../lib/components/targeting/interfaces/targeting-spec.interface';

@Component({
  selector:        'app-demo-geo-targeting',
  templateUrl:     './demo-geo-targeting.component.html',
  styleUrls:       ['demo-geo-targeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoGeoTargetingComponent implements OnInit {

  hideGeoTargeting = false;
  isSpecVisible    = false;
  lang             = 'en_US';

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

  ngOnInit () {
  }

}
