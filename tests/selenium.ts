import "./seleniumtests/loadPage";

after(() => {
  try {
    browser.close();
  } catch (error) {
    // for chrome webdriver close
  }
});
