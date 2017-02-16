import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { NgLocaleLocalization } from '@angular/common/src/localization';
import { I18nPluralPipe } from '@angular/common';
import { TranslateService } from 'ng2-translate/src/translate.service';

export interface PluralMap {
  [zero: string]: string;
  one: string;
  two: string;
  few: string;
  many: string;
  other: string;
}

@Injectable()
@Pipe({
  name: 'fbaPlural'
})
export class PluralPipe implements PipeTransform {

  constructor (private translateService: TranslateService) {}

  transform (count: number, pluralMap: PluralMap): string {
    const currentLang    = this.translateService.currentLang;
    const localization   = new NgLocaleLocalization(currentLang.split('_')[0]);
    const i18nPluralPipe = new I18nPluralPipe(localization);

    return i18nPluralPipe.transform(count, pluralMap);
  }

}
