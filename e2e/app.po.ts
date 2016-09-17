import { browser, element, by } from 'protractor/globals';

export class AitargetComponentsPage {
  static navigateTo () {
    return browser.get('/');
  }

  static getAppTitleLinkText () {
    return element(by.css('app-root .app__title-link'))
      .getText();
  }

  static getLinkFor (text: string) {
    return element(by.linkText(text));
  }
}
