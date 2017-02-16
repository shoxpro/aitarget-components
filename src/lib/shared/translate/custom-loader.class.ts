import { TranslateLoader } from 'ng2-translate/src/translate.service';
import { Observable } from 'rxjs/Observable';

let en = require('../../i18n/en.json');
let ru = require('../../i18n/ru.json');
let cn = require('../../i18n/cn.json');

export class CustomLoader implements TranslateLoader {
  getTranslation (lang: string): Observable<any> {
    switch (lang) {
      case 'en_US':
        return Observable.of(en);
      case 'ru_RU':
        return Observable.of(ru);
      case 'zh_CN':
        return Observable.of(cn);
      default:
        return Observable.of({});
    }
  }
}
