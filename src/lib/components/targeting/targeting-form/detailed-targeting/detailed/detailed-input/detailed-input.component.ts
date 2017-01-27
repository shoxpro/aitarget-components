import {
  Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Input, NgZone, ElementRef
} from '@angular/core';
import { DetailedApiService } from '../detailed-api/detailed-api.service';
import { DetailedModeService } from '../detailed-mode/detailed-mode.service';
import { DetailedInputService } from './detailed-input.service';
import { DetailedInfoService } from '../detailed-info/detailed-info.service';
import { DetailedSelectedService } from '../detailed-selected/detailed-selected.service';
import { DetailedItem } from '../detailed-item';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Subject } from 'rxjs';

@Component({
  selector:        'fba-detailed-input',
  templateUrl:     'detailed-input.component.html',
  styleUrls:       ['detailed-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedInputComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  @Input() type: string;

  term;
  mode;
  hasFocus;
  inputElement;
  structuredSelectedItems;
  activeInfo;

  /**
   * On key up handler.
   * @param term
   */
  keyup (term: string) {
    this.detailedInputService.setTerm(term);
  }

  /**
   * Open dropdown with suggestions when gets focus
   */
  focus () {
    this.hasFocus = true;

    if (this.type === 'flexible_spec') {
      this.detailedModeService.set('suggested');
    } else {
      this.detailedModeService.set('browse');
    }

    this.changeDetectorRef.markForCheck();
  }

  /**
   * Process focus lost
   */
  blur () {
    this.hasFocus = false;
    this.changeDetectorRef.markForCheck();
  }

  constructor (private ngZone: NgZone,
               private detailedApiService: DetailedApiService,
               private detailedModeService: DetailedModeService,
               private detailedInputService: DetailedInputService,
               private detailedInfoService: DetailedInfoService,
               private detailedSelectedService: DetailedSelectedService,
               private elementRef: ElementRef,
               private translateService: TranslateService,
               private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.inputElement = this.elementRef.nativeElement.querySelector('input');

    this.detailedInputService.term
        .takeUntil(this.destroy$)
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe((term: string) => {
          this.term = term;

          if (!term) {
            this.detailedInfoService.update(null);
          } else {
            /**
             * Async task that should be run inside angular Zone.
             * Allow proper change detection when is used outside on angular 2 (e.g. angular 1 apps)
             **/
            this.ngZone.run(() => {
              this.detailedModeService.set('search');
              this.detailedApiService.search(term);
            });
          }

          this.changeDetectorRef.markForCheck();
        });

    this.detailedModeService.mode
        .takeUntil(this.destroy$)
        .distinctUntilChanged()
        .subscribe(() => {
          this.detailedInputService.setTerm('');
        });

    this.detailedModeService.mode
        .takeUntil(this.destroy$)
        .subscribe((mode: string) => {
          this.mode = mode;

          this.changeDetectorRef.markForCheck();
        });

    this.detailedSelectedService.items
        .map(this.detailedSelectedService.structureSelectedItems)
        .subscribe((structuredSelectedItems) => {
          this.structuredSelectedItems = structuredSelectedItems;
          this.changeDetectorRef.markForCheck();
        });

    this.detailedInfoService.item
        .takeUntil(this.destroy$)
        .debounceTime(50)
        .subscribe((item: DetailedItem) => {
          this.activeInfo = Boolean(item);
          this.changeDetectorRef.markForCheck();
        });

    this.detailedInputService.hasFocus
        .takeUntil(this.destroy$)
        .subscribe((hasFocus: boolean) => {
          if (hasFocus) {
            // Set native element focus
            this.inputElement.focus();
            // Process focus
            this.focus();
          } else {
            // Blur native element
            this.inputElement.blur();
            // Process blur
            this.blur();
          }
        });

    this.translateService.onLangChange
        .takeUntil(this.destroy$)
        .subscribe(() => {
          this.changeDetectorRef.markForCheck();
        });
  }

}
