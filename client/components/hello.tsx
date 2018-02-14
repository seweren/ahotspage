import { Button, TextField } from "material-ui";
import * as React from "react";

import { setCicca } from "../actions/mainActions";
import { store } from "../store/store";

interface helloInnerState {
  cicca: string
}

export class Hello extends React.Component<{}, helloInnerState> {

  public colors = ["red", "green", "purple", "orange", "blue", "cyan", "brown"];

  public constructor() {
    super({});
    this.state = { cicca: "delfin" };
  }

  public render() {
    return (
      <div>
        <TextField label="name" onChange={e => this.handleInput(e.currentTarget.value)} />
        <Button onClick={() => this.handleCiccaClick()}>
          {this.getRainbowText(`Szia ${this.state.cicca}`)}
        </Button>
      </div>
    );
  }

  private getRainbowText(text: string) {
    return text
      .split('')
      .map((letter, idx) =>
        <span key={idx} style={{ color: this.colors[idx % this.colors.length] }}>
          {letter}
        </span>
      )
  }

  private handleCiccaClick() {
    store.dispatch(setCicca({ cicca: "Melinda" }));
    this.setState({ cicca: "Melinda" });
  }

  private handleInput(text: string) {
    this.setState({ cicca: text });
  }

}
