import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingModeService } from './geo-targeting-mode.service';

@Component({
  selector:    'geo-targeting-mode',
  templateUrl: './geo-targeting-mode.component.html',
  styleUrls:   ['./geo-targeting-mode.component.css']
})
export class GeoTargetingModeComponent implements OnInit, OnDestroy {

  private _subscriptions = [];
  public mode;
  public modeTitle;
  public exclude;

  constructor (private TranslateService: TranslateService,
               private GeoTargetingModeService: GeoTargetingModeService) { }

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
      })
    );
  }

}
