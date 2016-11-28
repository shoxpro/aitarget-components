import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector:        'app-demo-targeting',
  templateUrl:     './demo-targeting.component.html',
  styleUrls:       ['./demo-targeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoTargetingComponent implements OnInit {

  hideTargeting = true;
  isSpecVisible = false;

  spec = {};

  showSpec (isVisible, event?) {
    if (event) {
      event.stopPropagation();
    }

    this.isSpecVisible = isVisible;

    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  onChange = (spec) => {
    this.spec = spec;
  };

  ngOnInit () {}

  constructor (private changeDetectorRef: ChangeDetectorRef) { }
}
