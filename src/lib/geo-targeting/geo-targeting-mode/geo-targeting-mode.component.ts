import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingModeService } from './geo-targeting-mode.service';

@Component({
  selector:        'geo-targeting-mode',
  templateUrl:     './geo-targeting-mode.component.html',
  styleUrls:       ['./geo-targeting-mode.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingModeComponent implements OnInit, OnDestroy {

  _subscriptions = [];
  mode;
  modeTitle;
  exclude;
  isOpen         = false;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  constructor (private translateService: TranslateService,
               private geoTargetingModeService: GeoTargetingModeService,
               private changeDetectorRef: ChangeDetectorRef) { }

  setMode (mode) {
    this.geoTargetingModeService.update(mode);
  }

  /**
   * Toggle Dropdown
   */
  toggleDropdown (event?) {
    if (event) {
      event.stopPropagation();
    }
    this.isOpen = !this.isOpen;
    this.updateTemplate();
  }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this._subscriptions.push(
      this.geoTargetingModeService.mode.subscribe((mode: string) => {
        this.mode      = mode;
        this.exclude   = mode === 'exclude';
        this.modeTitle = this.translateService.instant(`geo-targeting-mode.${mode}`);
        this.updateTemplate();
      })
    );

    /**
     * Update component's translations on language change
     */
    this._subscriptions.push(
      this.translateService.onLangChange.subscribe(() => {
        this.geoTargetingModeService.update(this.mode);
      })
    );
  }

}
