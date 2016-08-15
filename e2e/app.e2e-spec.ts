import { AitargetComponentsPage } from './app.po';

describe('aitarget-components App', function() {
  let page: AitargetComponentsPage;

  beforeEach(() => {
    page = new AitargetComponentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).not.toEqual('app works!');
  });
});
