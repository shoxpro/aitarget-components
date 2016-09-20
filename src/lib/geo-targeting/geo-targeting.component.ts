import { Component, OnInit, Input } from '@angular/core';
import { GeoTargetingApiService } from './geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingInputService } from './geo-targeting-input/geo-targeting-input.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { TargetingSpec } from '../targeting/targeting-spec.interface';
import { GeoTargetingDropdownService } from './geo-targeting-dropdown/geo-targeting-dropdown.service';

@Component({
  selector:    'geo-targeting',
  templateUrl: './geo-targeting.component.html',
  styleUrls:   ['./geo-targeting.component.css'],
  providers:   [GeoTargetingApiService, GeoTargetingInputService, GeoTargetingDropdownService]
})
export class GeoTargetingComponent implements OnInit {

  private _defaultLang: string = 'en_US';
  private _lang: string        = this._defaultLang;

  @Input('adaccountId') adaccountId: string;
  @Input('spec') spec: TargetingSpec    = {};
  @Input('onChange') onChange: Function = (spec?) => {};

  @Input('lang')
  set lang (lang: string) {
    this._lang = lang || this._defaultLang;
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.TranslateService.use(this.lang);
  }

  get lang () {
    return this._lang;
  }

  constructor (private TranslateService: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.TranslateService.setDefaultLang(this.lang);
  }

  ngOnInit () {
  }

}
