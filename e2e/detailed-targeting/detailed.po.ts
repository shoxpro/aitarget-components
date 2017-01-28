import { browser, element, by, ElementFinder } from 'protractor';

export class DetailedPage {
  static navigateTo () {
    return browser.get('/detailed-targeting');
  }

  static getIncludeControl () {
    return element(by.css('.fba-detailed_include'));
  }

  static getIncludeLegend () {
    return element(by.css('.fba-detailed-targeting-legend_include'));
  }

  static getIncludeLegendLabel () {
    return this.getIncludeLegend()
               .element(by.css('.fba-detailed-targeting-legend__label'));
  }

  static getNarrowControl () {
    return element(by.css('.fba-detailed_narrow'));
  }

  static getAddNarrowButton () {
    return element(by.linkText('Narrow Audience'));
  }

  static getAddNarrowFurtherButton () {
    return element(by.linkText('Narrow Further'));
  }

  static getNarrowLegend () {
    return element(by.css('.fba-detailed-targeting-legend_exclude'));
  }

  static getNarrowLegendLabel () {
    return this.getNarrowLegend()
               .element(by.css('.fba-detailed-targeting-legend__label'));
  }

  static getRemoveNarrowButton () {
    return this.getNarrowLegend()
               .element(by.tagName('fba-close'));
  }

  static getExcludeControl () {
    return element(by.css('.fba-detailed_exclude'));
  }

  static getAddExcludeButton () {
    return element(by.linkText('Exclude People'));
  }

  static getExcludeLegend () {
    return element(by.css('.fba-detailed-targeting-legend_exclude'));
  }

  static getExcludeLegendLabel () {
    return this.getExcludeLegend()
               .element(by.css('.fba-detailed-targeting-legend__label'));
  }

  static getRemoveExcludeButton () {
    return this.getExcludeLegend()
               .element(by.tagName('fba-close'));
  }

  static getInput (control: ElementFinder) {
    return control.element(by.css('.fba-detailed-input__input'));
  }

  static getSuggestedButton (control: ElementFinder) {
    return control.element(by.css('.fba-detailed-mode__suggested'));
  }

  static getBrowseButton (control: ElementFinder) {
    return control.element(by.css('.fba-detailed-mode__browse'));
  }

  static getSuggestedDropdown () {
    return element(by.css('.fba-detailed-dropdown-suggested__list'));
  }

  static getBrowseDropdown () {
    return element(by.css('.fba-detailed-dropdown-browse__list'));
  }

  static getSuggestedActiveRow () {
    return element(by.css('.fba-detailed-dropdown-suggested__row_active'));
  }

  static getSuggestedRow (index: number) {
    return element.all(by.css('.fba-detailed-dropdown-suggested__row'))
                  .get(index);
  }

  static getSuggestedRowName (row: ElementFinder) {
    return row.element(by.css('.fba-detailed-dropdown-suggested__name'))
              .getText();
  }

  static getDetailedSelectedGroups () {
    return element.all(by.css('.detailed-selected__group'));
  }

  static getSelectedItems () {
    return element.all(by.css('.fba-detailed-selected__item'));
  }

  static getSelectedItemName (item: ElementFinder) {
    return item.element(by.css('.fba-detailed-selected__item-name'))
               .getText();
  }

  static getLegendLabels () {
    return element.all(by.css('.fba-detailed-targeting-legend__label'));
  }
}
