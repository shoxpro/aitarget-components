import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FbService {

  /**
   * Load the SDK asynchronously
   */
  private loadSdk () {
    let js,
      id = 'facebook-jssdk',
      s = 'script',
      fjs = document.getElementsByTagName(s)[0];

    if (document.getElementById(id)) {
      return;
    }
    js = document.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }

  private setAsyncInit (observer) {
    (<any>window).fbAsyncInit = () => {
      /**
       * Use Aitarget selfservice app id as default value
       * @see
       * {@link https://developers.facebook.com/apps/683082315084696/dashboard/}
       * @type {string}
       */
      let aitargetSelfserviceAppId = '683082315084696';
      let FB = (<any>window).FB;

      FB.init({
        appId: `${(<any>window).app_id || aitargetSelfserviceAppId}`,
        status: true,
        cookie: true,
        xfbml: true,
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

  public api = Observable.create((observer) => {
    let FB = (<any>window).FB;
    if (FB) {
      observer.next(FB);
    } else {
      this.setAsyncInit(observer);
      this.loadSdk();
    }
  });
}
