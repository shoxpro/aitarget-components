import { Injectable } from '@angular/core';
import { FB } from '../../fb/fb.interface';
import { TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';
import { FbService } from '../../fb/fb.service';
import { Observable } from 'rxjs';
import { SdkError } from '../../shared/errors/sdkError';
import { Locale } from '../interfaces/locale.interface';

@Injectable()
export class LocalesApiService {

  _defaultLang: string = 'en_US';
  lang: string         = this._defaultLang;

  get sdk (): Observable<FB> {
    return this.fbService.sdk
               .filter((FB: FB) => Boolean(FB))
               .take(1);
  }

  _locales: Array<Locale>;
  locales$ = this.sdk.switchMap((FB: FB) => {
    if (this._locales) {
      return Observable.of(this._locales);
    }
    return Observable.create((observer) => {
      FB.api(`/search`, {
        type:   'adlocale',
        limit:  500,
        locale: this.lang
      }, (response) => {
        if (response.error) {
          observer.error(new SdkError(response.error));
        } else {
          observer.next(response.data);
          observer.complete();
        }
      });
    });
  });

  constructor (private fbService: FbService,
               private translateService: TranslateService) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    this.locales$
        .take(1)
        .subscribe((locales: Array<Locale>) => this._locales = locales);
  }

}
