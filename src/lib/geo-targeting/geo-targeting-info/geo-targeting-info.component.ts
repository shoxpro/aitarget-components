import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingInfoService } from './geo-targeting-info.service';

@Component({
  selector:        'geo-targeting-info',
  templateUrl:     './geo-targeting-info.component.html',
  styleUrls:       ['./geo-targeting-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingInfoComponent implements OnInit, OnDestroy {

  private _subscriptions = [];

  public infoLevel: 'info'|'error';
  public message: string;
  public canRevert: boolean;
  public isVisible: boolean = false;

  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  public hide () {
    this.GeoTargetingInfoService.hide();
  }

  public undoChange () {
    this.GeoTargetingSelectedService.update(
      this.GeoTargetingSelectedService.getPrevItems()
    );
    this.hide();
  }

  constructor (private GeoTargetingSelectedService: GeoTargetingSelectedService,
               private GeoTargetingInfoService: GeoTargetingInfoService,
               private ChangeDetectorRef: ChangeDetectorRef) { }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this._subscriptions.push(
      this.GeoTargetingInfoService.message.subscribe((message) => {
        this.message = message;
        this.updateTemplate();
      })
    );

    this._subscriptions.push(
      this.GeoTargetingInfoService.infoLevel.subscribe((infoLevel) => {
        this.infoLevel = infoLevel;
        this.updateTemplate();
      })
    );

    this._subscriptions.push(
      this.GeoTargetingInfoService.canRevert.subscribe((canRevert) => {
        this.canRevert = canRevert;
        this.updateTemplate();
      })
    );

    this._subscriptions.push(
      this.GeoTargetingInfoService.isVisible.subscribe((isVisible) => {
        this.isVisible = isVisible;
        this.updateTemplate();
      })
    );
  }

}
