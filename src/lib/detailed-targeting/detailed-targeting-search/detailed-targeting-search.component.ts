import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ElementRef } from '@angular/core';
import { DetailedTargetingSearchService } from './detailed-targeting-search.service';
import { Subject, Observable } from 'rxjs/Rx';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';

@Component({
  selector:        'detailed-targeting-search',
  templateUrl:     './detailed-targeting-search.component.html',
  styleUrls:       ['./detailed-targeting-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingSearchComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  _term = new Subject();
  term  = this._term.asObservable();
  items;
  type;

  constructor (private detailedTargetingSearchService: DetailedTargetingSearchService,
               private detailedTargetingApiService: DetailedTargetingApiService,
               private elementRef: ElementRef,
               private changeDetectorRef: ChangeDetectorRef) {
  }

  closeSearch = () => {
    this.detailedTargetingSearchService.update({isVisible: false, type: this.type});
  };

  /**
   * On key up handler.
   * @param term
   */
  keyup (term: string) {
    this._term.next(term);
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.detailedTargetingSearchService.data
        .takeUntil(this.destroy$)
        .subscribe((data) => {
          this.type = data.type;

          if (data.isVisible) {
            let elm     = this.elementRef.nativeElement;
            let input   = elm.querySelector('input');
            input.value = null;
            input.focus();
          }

          this.items = Observable.of(null);

          this.changeDetectorRef.markForCheck();
        });

    this.term
        .takeUntil(this.destroy$)
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe((value: string) => {
          if (value) {
            this.items = this.detailedTargetingApiService
                             .filteredSearch(value, this.type);
          } else {
            this.items = Observable.of(null);
          }

          this.changeDetectorRef.markForCheck();
        });
  }

}
