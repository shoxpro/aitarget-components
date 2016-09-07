import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { FB } from './fb.interface';
import { TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';

@Injectable()
export class FbService {

  private _api = new BehaviorSubject<FB>(null);

  public api                   = this._api.asObservable();
  private _defaultLang: string = 'en_US';
  private lang: string         = this._defaultLang;

  /**
   * Load the SDK asynchronously
   */
  private loadSdk (lang: string = this._defaultLang) {
    let js,
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

  private setAsyncInit (observer) {
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
      let FB: FB                   = (<any>window).FB;

      FB.init({
        appId:   `${(<any>window).app_id || aitargetSelfserviceAppId}`,
        status:  true,
        cookie:  true,
        xfbml:   true,
        version: 'v2.7'
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

  private startSdk = (lang: string = this._defaultLang) => {
    this.setAsyncInit(this._api);
    this.loadSdk(lang);
  };

  constructor (private TranslateService: TranslateService) {
    this.TranslateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    this.startSdk(this.lang);
  }

}
