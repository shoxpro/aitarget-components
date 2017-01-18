import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { GeoTargetingInfoService } from './geo-targeting-info.service';
import { AppState } from '../../../../../../app/reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector:        'geo-targeting-info',
  templateUrl:     'geo-targeting-info.component.html',
  styleUrls:       ['geo-targeting-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingInfoComponent implements OnInit, OnDestroy {

  model$;

  hideInfo () {
    this.geoTargetingInfoService.hideInfo();
  }

  revert () {
    this.hideInfo();

    this.model$
        .take(1)
        .subscribe((model) => {
          this.geoTargetingInfoService.revert(model.revertKeys);
        });
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingInfoService: GeoTargetingInfoService) {
    this.model$ = this._store.let(this.geoTargetingInfoService.getModel);
  }

  ngOnDestroy () {}

  ngOnInit () {
    // TODO: Translate message on language change
  }

}
