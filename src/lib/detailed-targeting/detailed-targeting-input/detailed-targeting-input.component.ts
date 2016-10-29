import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingInputService } from './detailed-targeting-input.service';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingSelectedService } from '../detailed-targeting-selected/detailed-targeting-selected.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector:        'detailed-targeting-input',
  templateUrl:     'detailed-targeting-input.component.html',
  styleUrls:       ['detailed-targeting-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedTargetingInputComponent implements OnInit {
  term;
  mode;
  hasFocus;
  structuredSelectedItems;
  activeInfo;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    // TODO: rethink this timeout, but without it it throws "Attempt to use a destroyed view: detectChanges"
    setTimeout(() => {
      this.ref.detach();
      this.ref.markForCheck();
      this.ref.detectChanges();
    }, 0);
  }

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
    this.updateTemplate();
  }

  /**
   * Process focus lost
   */
  blur () {
    this.hasFocus = false;
    this.updateTemplate();
  }

  constructor (private detailedTargetingApiService: DetailedTargetingApiService,
               private detailedTargetingModeService: DetailedTargetingModeService,
               private detailedTargetingInputService: DetailedTargetingInputService,
               private detailedTargetingInfoService: DetailedTargetingInfoService,
               private detailedTargetingSelectedService: DetailedTargetingSelectedService,
               private translateService: TranslateService,
               private ref: ChangeDetectorRef) {
  }

  ngOnInit () {
    this.detailedTargetingInputService.term
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

          this.updateTemplate();
        });

    this.detailedTargetingModeService.mode
        .distinctUntilChanged()
        .subscribe(() => {
          this.detailedTargetingInputService.setTerm('');
        });

    this.detailedTargetingModeService.mode.subscribe((mode: string) => {
      this.mode = mode;

      this.updateTemplate();
    });

    this.detailedTargetingSelectedService.items
        .map(this.detailedTargetingSelectedService.structureSelectedItems)
        .subscribe((structuredSelectedItems) => {
          this.structuredSelectedItems = structuredSelectedItems;
          this.updateTemplate();
        });

    this.detailedTargetingInfoService.item
        .debounceTime(50)
        .subscribe((item: DetailedTargetingItem) => {
          this.activeInfo = Boolean(item);
          this.updateTemplate();
        });

    this.translateService.onLangChange.subscribe(() => {
      this.updateTemplate();
    });
  }

}
