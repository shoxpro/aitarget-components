export class AitargetComponentsPage {
  static navigateTo () {
    return browser.get('/');
  }

  static getAppTitleLinkText () {
    return element(by.css('fba-root .app__title-link'))
      .getText();
  }

  static getLinkFor (text: string) {
    return element(by.linkText(text));
  }
}
