/// <reference types="mocha" />
import { equal } from "assert";

describe("fixture", () => {
  it("has the expected page title", () => {
    browser.url("/");
    equal(1, 1);
  });
});
