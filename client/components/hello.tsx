import * as React from "react";
import { connect } from "react-redux";

import { setReduxStringData } from "../actions/mainActions";
import { IMainState } from "../model/mainState";

export interface IHelloReactProps {
  reactStringData: string;
}

export interface IHelloReduxProps {
  reduxStringData: string;
  reduxNumberData: number;
}

export interface IHelloDispatchProps {
  setReduxData: (s: string) => void;
}

export class HelloComp extends React.Component<IHelloReduxProps & IHelloDispatchProps, IHelloReactProps> {

  public colors = ["red", "green", "purple", "orange", "blue", "cyan", "brown"];

  public constructor(props: any) {
    super(props);
    this.state = { reactStringData: "init" };
  }

  public render() {
    return (
      <div>
        <input type="text" title="name" onChange={this.handleInput} />
        <button onClick={this.handleClick}>
          {this.getRainbowText(`Hello ${this.state.reactStringData}`)}
        </button>
        <span id="reduxNumber">{this.props.reduxNumberData}</span>
        <span id="reduxString">{this.props.reduxStringData}</span>
      </div>
    );
  }

  private getRainbowText(text: string) {
    return text
      .split("")
      .map((letter, idx) => (
        <span key={idx} style={{ color: this.colors[idx % this.colors.length] }}>
          {letter}
        </span>
      ),
    );
  }

  private handleClick = () => {
    this.props.setReduxData("reduxData");
    this.setState({ reactStringData: "reactData" });
  }

  private handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ reactStringData: event.currentTarget.value });
  }

}

export default connect<IHelloReduxProps, IHelloDispatchProps, {}, IMainState>(
  (state) => ({
    reduxNumberData: state.reduxNumberData,
    reduxStringData: state.reduxStringData,
  }),
  (dispatch) => ({
    setReduxData: (s: string) => dispatch(setReduxStringData({ stringData: s })),
  }),
)(HelloComp);
