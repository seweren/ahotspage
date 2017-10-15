import * as React from "react";

import { setCicca } from "../actions/mainActions";
import { store } from "../store/store";

interface helloInnerState {
  cicca: string
}

export class Hello extends React.Component<{}, helloInnerState> {

  public constructor() {
    super();
    this.state = { cicca: "delfin" };
  }

  public render() {
    return (
      <button onClick={() => this.handleCiccaClick()}>Hello {this.state.cicca}</button>
    );
  }

  private handleCiccaClick() {
    store.dispatch(setCicca({ cicca: "cicca" }));
    this.setState({ cicca: "cicca" });
  }
}
