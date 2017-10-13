import * as React from "react";

import { setCicca } from "./actions/mainActions";
import { store } from "./store/store";

export class Hello extends React.Component<{}, {}> {

  public render() {
    return (
      <button onClick={() => this.handleCiccaClick()}>Hello cicca</button>
    );
  }

  private handleCiccaClick() {
    store.dispatch(setCicca("cicca"));

  }
}
