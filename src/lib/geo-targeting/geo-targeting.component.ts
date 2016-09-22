import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { GeoTargetingApiService } from './geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingInputService } from './geo-targeting-input/geo-targeting-input.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { TargetingSpec } from '../targeting/targeting-spec.interface';
import { GeoTargetingDropdownService } from './geo-targeting-dropdown/geo-targeting-dropdown.service';
import { GeoTargetingSelectedService } from './geo-targeting-selected/geo-targeting-selected.service';

@Component({
  selector:    'geo-targeting',
  templateUrl: './geo-targeting.component.html',
  styleUrls:   ['./geo-targeting.component.css'],
  providers:   [GeoTargetingApiService, GeoTargetingInputService, GeoTargetingDropdownService,
    GeoTargetingSelectedService]
})
export class GeoTargetingComponent implements OnInit, OnDestroy {

  private _defaultLang: string = 'en_US';
  private _lang: string        = this._defaultLang;
  private subscriptions        = [];

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

  /**
   * Process user click outside geo-targeting element
   * Close dropdown and blur input, etc.
   * @param e
   */
  private processOutsideClick = (e) => {
    let targetElement = e.target;

    const clickedInside = this.ElementRef.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.GeoTargetingDropdownService.close();
      this.GeoTargetingInputService.blur();
    }
  };

  /**
   * Process user press some key
   * Close dropdown and blur input when pressing escape key
   * @param e
   */
  private processKeydown = (e) => {
    // when Escape
    if (e.keyCode === 27) {
      this.GeoTargetingDropdownService.close();
      this.GeoTargetingInputService.blur();
    }
  };

  /**
   * Bind to global events
   */
  private bindAll () {
    window.document.body.addEventListener('click', this.processOutsideClick);
    window.document.body.addEventListener('keydown', this.processKeydown);
  }

  /**
   * Unbind from global events
   */
  private unbindAll () {
    window.document.body.removeEventListener('click', this.processOutsideClick);
    window.document.body.removeEventListener('keydown', this.processKeydown);
  }

  constructor (private TranslateService: TranslateService,
               private GeoTargetingDropdownService: GeoTargetingDropdownService,
               private GeoTargetingInputService: GeoTargetingInputService,
               private ElementRef: ElementRef) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.TranslateService.setDefaultLang(this.lang);
  }

  ngOnDestroy () {
    // Unsubscribe from all Observables
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit () {
    /**
     * Bind/unbind different events depending on geo-targeting dropdown state.
     */
    this.subscriptions.push(
      this.GeoTargetingDropdownService.isOpen.subscribe((isOpen: boolean) => {
        this.unbindAll();
        if (isOpen) {
          this.bindAll();
        }
      })
    );
  }

}
