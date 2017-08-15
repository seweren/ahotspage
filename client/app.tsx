import * as React from "react";

export class App extends React.Component<{}, { count: number; }> {

  public state = { count: 0 };

  private interval: number;

  public componentWillMount() {
    this.interval = window.setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }

  public componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  public render() {
    return (
      <div>
        <h1>Hello cicca!</h1>
        <div>Hot-reloading React written in TypeScript! {this.state.count}</div>
      </div>
    );
  }
}
