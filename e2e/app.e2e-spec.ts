import { AitargetComponentsPage } from './app.po';

describe('aitarget-components App', function() {
  let page: AitargetComponentsPage;

  beforeEach(() => {
    page = new AitargetComponentsPage();
  });

  it('should display toggle button', () => {
    page.navigateTo();
    expect(page.getToggleButtonText()).toEqual('Toggle');
  });
});
