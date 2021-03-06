import { DetailedPage as page } from './detailed.po';

xdescribe('aitarget-components Detailed Targeting', function () {
  beforeAll(() => {
    page.navigateTo();
  });

  describe(`select item`, () => {
    it(`should select first suggested item`, () => {
      page.getInput(page.getIncludeControl())
          .click();

      const itemTextToSelect = page.getSuggestedRowName(page.getSuggestedActiveRow());

      page.getSuggestedActiveRow()
          .click();

      expect(page.getSelectedItemName(page.getSelectedItems()
                                          .first()))
        .toEqual(itemTextToSelect);
    });
  });

  describe(`selected`, () => {
    xit('should have preselected groups of detailed targeting', () => {
      expect(page.getDetailedSelectedGroups()
                 .count())
        .toBe(4);
    });

    xit('should have preselected items of detailed targeting', () => {
      expect(page.getSelectedItems()
                 .count())
        .toBe(8);
    });

    xit('should delete group', () => {
    });

    xit('should delete item', () => {
    });

    xit('should open and scroll browse dropdown on breadcrumb click', () => {
    });
  });

  describe(`suggested`, () => {
    xit('should show suggested dropdown if input got focus', () => {
    });

    xit('should close when clicked outside', () => {
    });

    xit('should suggest new items when selected list changes', () => {
    });

    xit('should select item when it is clicked in dropdown', () => {
    });
  });

  describe(`search`, () => {
    xit('should search items for entered term', () => {
    });

    xit('should switch to search mode when starting to type', () => {
    });

    xit('should show info block when put mouse over item row', () => {
    });
  });

  describe(`browse`, () => {
    xit('should be able to select 1 item from the browse tree', () => {
    });

    xit('should select the whole item group from then browse tree', () => {
    });

    xit('should deselect the whole item group from then browse tree', () => {
    });

    xit('should open filtered search mode from the browse tree', () => {
    });

    xit('should close filtered search mode when click back', () => {
    });

    xit('should be able to find filtered school', () => {
    });

    xit('should select filtered school without closing filtered search mode', () => {
    });
  });
});
