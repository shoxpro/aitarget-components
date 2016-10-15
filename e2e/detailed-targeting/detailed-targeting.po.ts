import { browser, element, by } from 'protractor';

export class DetailedTargetingPage {
  static navigateTo () {
    return browser.get('/detailed-targeting');
  }

  static getDetailedTargetingSelectedGroups () {
    return element.all(by.css('.detailed-targeting-selected__group'));
  }

  static getDetailedTargetingSelectedItems () {
    return element.all(by.css('.detailed-targeting-selected__item'));
  }
}
