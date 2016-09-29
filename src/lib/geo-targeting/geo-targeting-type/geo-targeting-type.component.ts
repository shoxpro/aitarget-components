import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingTypeService } from './geo-targeting-type.service';
import { LocationType } from '../../targeting/targeting-spec-geo.interface';
import { TargetingSpecService } from '../../targeting/targeting-spec.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';

interface Type {
  title: string;
  info: string;
  showInfo?: boolean;
  value: LocationType[];
}

@Component({
  selector:        'geo-targeting-type',
  templateUrl:     './geo-targeting-type.component.html',
  styleUrls:       ['./geo-targeting-type.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingTypeComponent implements OnInit, OnDestroy {

  private _subscriptions = [];
  private types: Type[];
  private selectedType: Type;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  public select (type) {
    this.GeoTargetingTypeService.update(type.value);
    this.TargetingSpecService.update(this.GeoTargetingSelectedService.getSpec());
  }

  constructor (private ChangeDetectorRef: ChangeDetectorRef,
               private TranslateService: TranslateService,
               private GeoTargetingTypeService: GeoTargetingTypeService,
               private GeoTargetingSelectedService: GeoTargetingSelectedService,
               private TargetingSpecService: TargetingSpecService) {}

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this.types = [
      {
        title: this.TranslateService.instant(`geo-targeting-type.ALL`),
        info:  this.TranslateService.instant(`geo-targeting-type.ALL_INFO`),
        value: ['home', 'recent']
      },
      {
        title: this.TranslateService.instant(`geo-targeting-type.HOME`),
        info:  this.TranslateService.instant(`geo-targeting-type.HOME_INFO`),
        value: ['home']
      },
      {
        title: this.TranslateService.instant(`geo-targeting-type.RECENT`),
        info:  this.TranslateService.instant(`geo-targeting-type.RECENT_INFO`),
        value: ['recent']
      },
      {
        title: this.TranslateService.instant(`geo-targeting-type.TRAVEL_IN`),
        info:  this.TranslateService.instant(`geo-targeting-type.TRAVEL_IN_INFO`),
        value: ['travel_in']
      },
    ];

    this._subscriptions.push(
      this.GeoTargetingTypeService.type.subscribe((selectedTypeValue: LocationType[]) => {
        this.selectedType = this.types.filter((type) => {
          return type.value.join() === selectedTypeValue.join();
        })[0];

        this.updateTemplate();
      })
    );
  }

}
