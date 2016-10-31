import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';
import { GeoTargetingSearchService } from './geo-targeting-search.service';

@Component({
  selector:        'geo-targeting-search',
  templateUrl:     './geo-targeting-search.html',
  styleUrls:       ['./geo-targeting-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingSearchComponent {
  model$;

  focus () {
    this.geoTargetingSearchService.focus();
  }

  blur () {
    this.geoTargetingSearchService.blur();
  }

  inputValueChange (inputValue) {
    this.geoTargetingSearchService.processInputValue(inputValue);
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingSearchService: GeoTargetingSearchService) {
    this.model$ = this._store.let(GeoTargetingSearchService.getModel);
    setTimeout(() => {
      this.geoTargetingSearchService.focus();
    }, 2500);
  }
}
