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

  private _subscriptions = [];
  public mode;
  public modeTitle;
  public exclude;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  private updateTemplate () {
    this.ChangeDetectorRef.markForCheck();
    this.ChangeDetectorRef.detectChanges();
  }

  constructor (private TranslateService: TranslateService,
               private GeoTargetingModeService: GeoTargetingModeService,
               private ChangeDetectorRef: ChangeDetectorRef) { }

  public changeMode () {
    let mode = this.GeoTargetingModeService.get();
    let map  = {
      'include': 'exclude',
      'exclude': 'include'
    };

    this.GeoTargetingModeService.update(map[mode]);
  }

  ngOnDestroy () {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    this._subscriptions.push(
      this.GeoTargetingModeService.mode.subscribe((mode: string) => {
        this.mode      = mode;
        this.exclude   = mode === 'exclude';
        this.modeTitle = this.TranslateService.instant(`geo-targeting-mode.${mode}`);
        this.updateTemplate();
      })
    );

    /**
     * Update component's translations on language change
     */
    this._subscriptions.push(
      this.TranslateService.onLangChange.subscribe(() => {
        this.GeoTargetingModeService.update(this.mode);
      })
    );
  }

}
