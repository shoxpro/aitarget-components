import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ElementRef } from '@angular/core';
import { DetailedTargetingSearchService } from './detailed-targeting-search.service';
import { Subject, Observable } from 'rxjs/Rx';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';

@Component({
  selector:        'detailed-targeting-search',
  templateUrl:     './detailed-targeting-search.component.html',
  styleUrls:       ['./detailed-targeting-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingSearchComponent implements OnInit, OnDestroy {
  private subscriptions = [];
  private _term         = new Subject();
  public term           = this._term.asObservable();
  private items;
  private type;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  constructor (private DetailedTargetingSearchService: DetailedTargetingSearchService,
               private DetailedTargetingApiService: DetailedTargetingApiService,
               private ElementRef: ElementRef,
               private ref: ChangeDetectorRef) {
  }

  public closeSearch = () => {
    this.DetailedTargetingSearchService.update({isVisible: false, type: this.type});
  };

  /**
   * On key up handler.
   * @param term
   */
  public keyup (term: string) {
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
      this.DetailedTargetingSearchService.data.subscribe((data) => {
        this.type = data.type;

        if (data.isVisible) {
          let elm     = this.ElementRef.nativeElement;
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
            this.items = this.DetailedTargetingApiService
                             .filteredSearch(value, this.type);
          } else {
            this.items = Observable.of(null);
          }

          this.updateTemplate();
        });
  }

}
