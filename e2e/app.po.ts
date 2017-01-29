import { browser, element, by } from 'protractor';

export class AitargetComponentsPage {
  static navigateTo () {
    return browser.get('/');
  }

  static getDashboardTitleText () {
    return element(by.tagName('my-dashboard h3'))
      .getText();
  }

  static getLinkFor (text: string) {
    return element(by.linkText(text));
  }
}
