export class AitargetComponentsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return (<any>element(by.css('app-root h1'))).getText();
  }
}
