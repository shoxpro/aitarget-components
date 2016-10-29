import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingInfoService } from './geo-targeting-info.service';

@Component({
  selector:        'geo-targeting-info',
  templateUrl:     './geo-targeting-info.component.html',
  styleUrls:       ['./geo-targeting-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingInfoComponent implements OnInit, OnDestroy {

  _subscriptions = [];

  infoLevel: 'info'|'error';
  message: string;
  canRevert: boolean;
  isVisible: boolean = false;

  updateTemplate () {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  hide () {
    this.geoTargetingInfoService.hide();
  }

  undoChange () {
    this.geoTargetingSelectedService.update(
      this.geoTargetingSelectedService.getPrevItems()
    );
    this.hide();
  }

  constructor (private geoTargetingSelectedService: GeoTargetingSelectedService,
               private geoTargetingInfoService: GeoTargetingInfoService,
               private changeDetectorRef: ChangeDetectorRef) { }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this._subscriptions.push(
      this.geoTargetingInfoService.message.subscribe((message) => {
        this.message = message;
        this.updateTemplate();
      })
    );

    this._subscriptions.push(
      this.geoTargetingInfoService.infoLevel.subscribe((infoLevel) => {
        this.infoLevel = infoLevel;
        this.updateTemplate();
      })
    );

    this._subscriptions.push(
      this.geoTargetingInfoService.canRevert.subscribe((canRevert) => {
        this.canRevert = canRevert;
        this.updateTemplate();
      })
    );

    this._subscriptions.push(
      this.geoTargetingInfoService.isVisible.subscribe((isVisible) => {
        this.isVisible = isVisible;
        this.updateTemplate();
      })
    );
  }

}
