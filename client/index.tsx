/// <reference types="node" />
/// <reference types="webpack-env" />
import "bootstrap/dist/css/bootstrap.min.css";

import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";

import { App } from "./app";

function renderApp(COMPONENT: any) {
  const rootElement = document.getElementById("container");
  render(<AppContainer><COMPONENT /></AppContainer>, rootElement);
}

renderApp(App);

if (module.hot) {
  module.hot.accept("./app", () => {
    const ACCEPTED_APP = require("./app").App;
    renderApp(ACCEPTED_APP);
  });
}
