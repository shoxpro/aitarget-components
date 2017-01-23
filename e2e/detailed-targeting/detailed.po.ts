export class DetailedPage {
  static navigateTo () {
    return browser.get('/detailed');
  }

  static getDetailedSelectedGroups () {
    return element.all(by.css('.detailed-selected__group'));
  }

  static getDetailedSelectedItems () {
    return element.all(by.css('.fba-detailed-selected__item'));
  }
}
