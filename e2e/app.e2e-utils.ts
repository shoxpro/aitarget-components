export class UtilsE2E {
  /**
   * Pause browser for debug purposes
   */
  static pause () {
    browser.pause();
  }

  /**
   *[selectWindow Focus the browser to the index window.
   * @param  {[Object]} index [Is the index of the window. E.g., 0=browser, 1=FB popup]
   * @return {[!webdriver.promise.Promise.<void>]}
   */
  static selectWindow (index) {
    // wait for handles[index] to exist
    browser.wait(() => {
      return browser.driver.getAllWindowHandles()
                    .then((handles) => {
                      /**
                       * Assume that handles.length >= 1 and index >=0.
                       * So when calling selectWindow(index) return
                       * true if handles contains that window.
                       */
                      if (handles.length > index) {
                        return true;
                      }
                    });
    }, 30000);
    // here i know that the requested window exists

    // switch to the window
    return browser.driver.getAllWindowHandles()
                  .then((handles) => {
                    return browser.driver.switchTo()
                                  .window(handles[index]);
                  });
  };

  static login () {
    this.selectWindow(1);
    browser.ignoreSynchronization = true;

    element(by.name('email'))
      .sendKeys(browser.params.login.email);
    element(by.name('pass'))
      .sendKeys(browser.params.login.pass);
    element(by.name('login'))
      .click();

    browser.ignoreSynchronization = false;
    this.selectWindow(0);
    browser.sleep(2000);
  }
}
