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
  subscriptions = [];
  _term         = new Subject();
  term          = this._term.asObservable();
  items;
  type;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  constructor (private detailedTargetingSearchService: DetailedTargetingSearchService,
               private detailedTargetingApiService: DetailedTargetingApiService,
               private elementRef: ElementRef,
               private ref: ChangeDetectorRef) {
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
    // Unsubscribe from all Observables
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this.subscriptions.push(
      this.detailedTargetingSearchService.data.subscribe((data) => {
        this.type = data.type;

        if (data.isVisible) {
          let elm     = this.elementRef.nativeElement;
          let input   = elm.querySelector('input');
          input.value = null;
          input.focus();
        }

        this.items = Observable.of(null);

        this.updateTemplate();
      })
    );

    this.term
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe((value: string) => {
          if (value) {
            this.items = this.detailedTargetingApiService
                             .filteredSearch(value, this.type);
          } else {
            this.items = Observable.of(null);
          }

          this.updateTemplate();
        });
  }

}
