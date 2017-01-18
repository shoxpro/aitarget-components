import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { GeoInfoService } from './geo-info.service';
import { AppState } from '../../../../../../app/reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector:        'fba-geo-info',
  templateUrl:     'geo-info.component.html',
  styleUrls:       ['geo-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoInfoComponent implements OnInit, OnDestroy {

  model$;

  hideInfo () {
    this.geoInfoService.hideInfo();
  }

  revert () {
    this.hideInfo();

    this.model$
        .take(1)
        .subscribe((model) => {
          this.geoInfoService.revert(model.revertKeys);
        });
  }

  constructor (private _store: Store<AppState>,
               private geoInfoService: GeoInfoService) {
    this.model$ = this._store.let(this.geoInfoService.getModel);
  }

  ngOnDestroy () {}

  ngOnInit () {
    // TODO: Translate message on language change
  }

}
