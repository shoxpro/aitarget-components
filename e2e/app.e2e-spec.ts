import { AitargetComponentsPage as page } from './app.po';

describe('aitarget-components Demo', function () {

  beforeAll(() => {
    page.navigateTo();
  });

  it('should display proper title', () => {
    expect(page.getAppTitleLinkText())
      .toEqual('Aitarget Components');
  });

  it('should have links to available components', () => {
    let components = ['Detailed Targeting', 'Geo Targeting'];

    components.forEach((text) => {
      expect(page.getLinkFor(text)
                 .isPresent())
        .toBeTruthy();
    });
  });
});
