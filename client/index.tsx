import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { App } from "./app";

const rootElement = document.getElementById("container");
render(<AppContainer><App /></AppContainer>, rootElement);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./app", () => {
    const ACCEPTED_APP = require("./app").App;
    render(<AppContainer><ACCEPTED_APP /></AppContainer>, rootElement);
  });
}
