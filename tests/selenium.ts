/// <reference types="mocha" />
/// <reference types="node" />
/// <reference types="webdriverio" />
import "./seleniumtests/loadPage";

after(() => {
  try {
    browser.close();
  } catch (error) {
    // for chrome webdriver close
  }
});
