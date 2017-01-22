import { Component, ChangeDetectionStrategy, Input, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';

type Language = 'en_US' | 'ru_RU' | 'zh_CN';

@Component({
  selector:        'fba-localization',
  template:        `
                      <div *ngIf="!lang">
                        <button md-raised-button
                                (click)="setLanguage('en_US')">EN</button>
                        <button md-raised-button
                                (click)="setLanguage('ru_RU')">RU</button>
                        <button md-raised-button
                                (click)="setLanguage('zh_CN')">CN</button>
                      </div>
                    `,
  styles:          [`
                      :host {
                        display: inline-block;
                      }
                    `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalizationComponent implements OnChanges {

  static DEFAULT_LANGUAGE = 'en_US';

  @Input() lang;

  setLanguage (lang: Language) {
    this.translateService.use(lang);
  }

  ngOnChanges (changes) {
    let lang: Language = changes.lang.currentValue || LocalizationComponent.DEFAULT_LANGUAGE;
    this.translateService.use(lang);
  }

  constructor (private translateService: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang(LocalizationComponent.DEFAULT_LANGUAGE);
    this.translateService.use(LocalizationComponent.DEFAULT_LANGUAGE);
  }
}
