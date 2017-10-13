import * as React from "react";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router";

import { Hello } from "./hello";
import { hashHistory } from "./history/history";
import { store } from "./store/store";

export class App extends React.Component<{}, {}> {

  public render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Switch>
            <Route path="/" component={Hello} />
          </Switch>
        </Router>
      </Provider>
    );
  }

}
