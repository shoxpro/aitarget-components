import { Injectable } from '@angular/core';

@Injectable()
export class FbService {

  /**
   * Load the SDK asynchronously
   */
  loadSdk () {
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

  /**
   * Exec passed callback if FB sdk exists
   * @param callback
   */
  private execCallback (callback: Function) {
    let FB = (<any>window).FB;
    if (FB && typeof callback === 'function') {
      callback(FB);
    }
  }

  /**
   * Load and initialize facebook javascript SDK (global FB instance)
   * Trigger passed callback with FB instance
   * @param callback
   */
  get (callback: Function) {
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
        version: 'v2.6'
      });

      FB.Event.subscribe('auth.statusChange', (response) => {
        if (response.status === 'connected') {
          this.execCallback(callback);
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

    this.execCallback(callback);

    this.loadSdk();
  }
}
