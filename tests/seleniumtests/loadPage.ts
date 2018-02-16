/// <reference types="node" />
/// <reference types="webdriverio" />
import { equal } from "assert";

describe("fixture", () => {
  it("has the expected page title", () => {
    browser.url("/");
    equal(1, 2);
  });
});
