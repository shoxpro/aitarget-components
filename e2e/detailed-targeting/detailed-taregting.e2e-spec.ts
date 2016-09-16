import { DetailedTargetingPage } from './detailed-targeting.po';

describe('aitarget-components App', function () {
  let page: DetailedTargetingPage;

  beforeEach(() => {
    page = new DetailedTargetingPage();
  });

  it('should display toggle button', () => {
    page.navigateTo();
    expect(page.getToggleButtonText())
      .toEqual('Toggle');
  });
});
