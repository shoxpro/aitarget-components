import { browser, element, by } from 'protractor/globals';

export class AitargetComponentsPage {
  navigateTo() {
    return browser.get('/');
  }

  getToggleButtonText() {
    return element(by.css('app-root button')).getText();
  }
}
