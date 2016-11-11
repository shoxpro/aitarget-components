import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingInputService } from './detailed-targeting-input.service';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingSelectedService } from '../detailed-targeting-selected/detailed-targeting-selected.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Subject } from 'rxjs';

@Component({
  selector:        'detailed-targeting-input',
  templateUrl:     'detailed-targeting-input.component.html',
  styleUrls:       ['detailed-targeting-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingInputComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  term;
  mode;
  hasFocus;
  structuredSelectedItems;
  activeInfo;

  /**
   * On key up handler.
   * @param term
   */
  keyup (term: string) {
    this.detailedTargetingInputService.setTerm(term);
  }

  /**
   * Open dropdown with suggestions when gets focus
   */
  focus () {
    this.hasFocus = true;
    this.detailedTargetingModeService.set('suggested');
    this.changeDetectorRef.markForCheck();
  }

  /**
   * Process focus lost
   */
  blur () {
    this.hasFocus = false;
    this.changeDetectorRef.markForCheck();
  }

  constructor (private detailedTargetingApiService: DetailedTargetingApiService,
               private detailedTargetingModeService: DetailedTargetingModeService,
               private detailedTargetingInputService: DetailedTargetingInputService,
               private detailedTargetingInfoService: DetailedTargetingInfoService,
               private detailedTargetingSelectedService: DetailedTargetingSelectedService,
               private translateService: TranslateService,
               private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy () {
    this.destroy$.next();
  }

  ngOnInit () {
    this.detailedTargetingInputService.term
        .takeUntil(this.destroy$)
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe((term: string) => {
          this.term = term;

          if (!term) {
            this.detailedTargetingInfoService.update(null);
          } else {
            this.detailedTargetingModeService.set('search');
            this.detailedTargetingApiService.search(term);
          }

          this.changeDetectorRef.markForCheck();
        });

    this.detailedTargetingModeService.mode
        .takeUntil(this.destroy$)
        .distinctUntilChanged()
        .subscribe(() => {
          this.detailedTargetingInputService.setTerm('');
        });

    this.detailedTargetingModeService.mode
        .takeUntil(this.destroy$)
        .subscribe((mode: string) => {
          this.mode = mode;

          this.changeDetectorRef.markForCheck();
        });

    this.detailedTargetingSelectedService.items
        .map(this.detailedTargetingSelectedService.structureSelectedItems)
        .subscribe((structuredSelectedItems) => {
          this.structuredSelectedItems = structuredSelectedItems;
          this.changeDetectorRef.markForCheck();
        });

    this.detailedTargetingInfoService.item
        .takeUntil(this.destroy$)
        .debounceTime(50)
        .subscribe((item: DetailedTargetingItem) => {
          this.activeInfo = Boolean(item);
          this.changeDetectorRef.markForCheck();
        });

    this.translateService.onLangChange
        .takeUntil(this.destroy$)
        .subscribe(() => {
          this.changeDetectorRef.markForCheck();
        });
  }

}
