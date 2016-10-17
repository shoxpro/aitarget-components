import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

@Component({
  selector:        'geo-targeting-type',
  templateUrl:     './geo-targeting-type.component.html',
  styleUrls:       ['./geo-targeting-type.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingTypeComponent implements OnInit, OnDestroy {

  private _subscriptions = [];
  public typeTitle       = 'All';
  public isOpen          = false;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  // private updateTemplate () {
  //   this.ChangeDetectorRef.markForCheck();
  //   this.ChangeDetectorRef.detectChanges();
  // }

  constructor (/*private ChangeDetectorRef: ChangeDetectorRef*/) { }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
  }

}
