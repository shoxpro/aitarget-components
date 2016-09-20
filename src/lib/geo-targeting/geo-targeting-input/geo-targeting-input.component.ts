import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingInputService } from './geo-targeting-input.service';

@Component({
  selector:        'geo-targeting-input',
  templateUrl:     './geo-targeting-input.component.html',
  styleUrls:       ['./geo-targeting-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingInputComponent implements OnInit, OnDestroy {

  private term;
  private hasFocus;
  private subscriptions = [];

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  /**
   * On key up handler.
   * @param term
   */
  public keyup (term: string) {
    this.GeoTargetingInputService.setTerm(term);
  }

  /**
   * Open dropdown with suggestions when gets focus
   */
  public focus () {
    this.hasFocus = true;
    this.updateTemplate();
  }

  /**
   * Process focus lost
   */
  public blur () {
    this.hasFocus = false;
    this.updateTemplate();
  }

  constructor (private GeoTargetingApiService: GeoTargetingApiService,
               private GeoTargetingInputService: GeoTargetingInputService,
               private TranslateService: TranslateService,
               private ref: ChangeDetectorRef) {
  }

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this.subscriptions.push(
      this.GeoTargetingInputService.term
          .debounceTime(500)
          .distinctUntilChanged()
          .subscribe((term: string) => {
            this.term = term;

            if (term) {
              this.GeoTargetingApiService.search(term);
            }

            this.updateTemplate();
          })
    );

    this.subscriptions.push(
      this.TranslateService.onLangChange.subscribe(() => {
        this.updateTemplate();
      })
    );
  }

}
