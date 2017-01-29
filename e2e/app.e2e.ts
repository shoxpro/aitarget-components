import { AitargetComponentsPage as page } from './app.po';
import { browser } from 'protractor';

describe('aitarget-components Demo', function () {

  beforeAll(() => {
    page.navigateTo();
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'AitargetComponents';
    expect(subject)
      .toEqual(result);
  });

  xit('should display proper dashboard title', () => {
    expect(page.getDashboardTitleText())
      .toEqual('Welcome to the Dashboard!');
  });

  xit('should have links to available components', () => {
    let components = ['Detailed Targeting', 'Geo Targeting'];

    components.forEach((text) => {
      expect(page.getLinkFor(text)
                 .isPresent())
        .toBeTruthy();
    });
  });
});
