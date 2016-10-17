import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { GeoTargetingState, GEO_TARGETING_STATE_KEY } from '../geo-targeting.interface';
import { LibState } from '../../lib-state.interface';
import { Store } from '@ngrx/store';
import { GEO_TARGETING_TYPE_STATE_KEY, GeoTargetingTypeState } from './geo-targeting-type.interface';

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
  private model;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  // private updateTemplate () {
  //   this.ChangeDetectorRef.markForCheck();
  //   this.ChangeDetectorRef.detectChanges();
  // }

  public toggleDropdown () {
    this._store.dispatch({type: 'TEST'});
  }

  constructor (private _store: Store<LibState>,
               /*private ChangeDetectorRef: ChangeDetectorRef*/) {
    this.model = _store.select(GEO_TARGETING_STATE_KEY)
                       .map((geoTargetingState: GeoTargetingState) => geoTargetingState[GEO_TARGETING_TYPE_STATE_KEY])
                       .distinctUntilChanged();
  }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this._subscriptions.push(
      this.model.subscribe((geoTargetingType: GeoTargetingTypeState) => {
        console.log('geoTargetingType: ', geoTargetingType);
      })
    );
  }

}
