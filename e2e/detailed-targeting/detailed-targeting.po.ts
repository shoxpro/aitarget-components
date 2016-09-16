import { browser, element, by } from 'protractor/globals';

export class DetailedTargetingPage {
  navigateTo() {
    return browser.get('/detailed-targeting');
  }

  getToggleButtonText() {
    return element(by.css('app-root button')).getText();
  }
}
