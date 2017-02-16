import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ElementRef } from '@angular/core';
import { DetailedSearchService } from './detailed-search.service';
import { Subject } from 'rxjs/Subject';
import { DetailedApiService } from '../detailed-api/detailed-api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector:        'fba-detailed-search',
  templateUrl:     'detailed-search.component.html',
  styleUrls:       ['detailed-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedSearchComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  _term = new Subject();
  term  = this._term.asObservable();
  items;
  type;

  constructor (private detailedSearchService: DetailedSearchService,
               private detailedApiService: DetailedApiService,
               private elementRef: ElementRef,
               private changeDetectorRef: ChangeDetectorRef) {
  }

  closeSearch = () => {
    this.detailedSearchService.update({isVisible: false, type: this.type});
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
    this.detailedSearchService.data
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
            this.items = this.detailedApiService
                             .filteredSearch(value, this.type);
          } else {
            this.items = Observable.of(null);
          }

          this.changeDetectorRef.markForCheck();
        });
  }

}
