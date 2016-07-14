export class AitargetComponentsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('-root h1')).getText();
  }
}
