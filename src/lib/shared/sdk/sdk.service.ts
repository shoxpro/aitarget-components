import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SDK } from './sdk.interface';
import { LangChangeEvent, TranslateService } from 'ng2-translate/src/translate.service';

@Injectable()
export class SdkService {

  _sdk = new BehaviorSubject<SDK>(null);

  sdk                  = this._sdk.asObservable();
  _defaultLang: string = 'en_US';
  lang: string         = this._defaultLang;

  /**
   * Load the SDK asynchronously
   */
  loadSdk (lang: string = this._defaultLang) {
    let js: any,
        id  = `facebook-jssdk-${lang}`,
        s   = 'script',
        fjs = document.getElementsByTagName(s)[0];

    if (document.getElementById(id)) {
      return;
    }
    js     = document.createElement(s);
    js.id  = id;
    js.src = `//connect.facebook.net/${lang}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  }

  setAsyncInit (observer) {
    // Exit if fbAsyncInit was already set
    if ((<any>window).fbAsyncInit) {
      let FB = (<any>window).FB;
      if (FB) {
        observer.next(FB);
      }
      return;
    }
    (<any>window).fbAsyncInit = () => {
      /**
       * Use Aitarget selfservice app id as default value
       * @see
       * {@link https://developers.facebook.com/apps/683082315084696/dashboard/}
       * @type {string}
       */
      let aitargetSelfserviceAppId = '683082315084696';
      let FB: SDK                  = (<any>window).FB;
      let appId                    = `${(<any>window).app_id || aitargetSelfserviceAppId}`;

      FB.init({
        appId:   appId,
        status:  true,
        cookie:  true,
        xfbml:   true,
        version: 'v2.8'
      });

      FB.Event.subscribe('auth.statusChange', (response) => {
        if (response.status === 'connected') {
          observer.next(FB);
        }
      });

      FB.getLoginStatus(function (response: any) {
        if (response.status !== 'connected') {
          FB.login((result: any) => {
            console.log('Login result: ', result);
          }, {
            scope: 'email,ads_management'
          });
        }
      });
    };
  }

  startSdk = (lang: string = this._defaultLang) => {
    this.setAsyncInit(this._sdk);
    this.loadSdk(lang);
  };

  constructor (private translateService: TranslateService) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    this.startSdk(this.lang);
  }

}
