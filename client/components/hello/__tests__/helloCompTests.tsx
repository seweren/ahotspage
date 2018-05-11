/// <reference types="jest" />
import { configure, mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { setReduxStringData } from "../../../actions/mainActions";
import { IMainState } from "../../../model/mainState";
import Hello, {
  HelloComp,
  IHelloDispatchProps,
  IHelloReactProps,
  IHelloReduxProps,
} from "../hello";

configure({ adapter: new Adapter() });

describe("dummy HelloComp tests", () => {

  let helloWrapper: ShallowWrapper<IHelloDispatchProps & IHelloReduxProps, IHelloReactProps>;
  const mockHelloDispatch = jest.fn();

  beforeEach(() => {
    helloWrapper = shallow(
      <HelloComp
        setReduxData={mockHelloDispatch}
        reduxNumberData={0}
        reduxStringData=""
      />);
  });

  it("dumb comp", () => {
    expect(helloWrapper.type()).toEqual("div");
    expect(helloWrapper.childAt(0).type()).toEqual("input");
    expect(helloWrapper.childAt(1).type()).toEqual("button");
    expect(helloWrapper.childAt(1).text()).toEqual("Hello init");
    helloWrapper.setState({ reactStringData: "reactData" });
    expect(helloWrapper.childAt(1).text()).toEqual("Hello reactData");
    helloWrapper.find("button").simulate("click");
    expect(mockHelloDispatch.mock.calls.length).toEqual(1);
    helloWrapper.find("input").simulate("change", { currentTarget: { value: "test" } });
    expect(helloWrapper.childAt(1).text()).toEqual("Hello test");
  });

});

describe("dummy Hello tests", () => {

  const initialState: IMainState = {
    reduxNumberData: 0,
    reduxStringData: "oldReduxData",
  };
  const store = configureStore<IMainState>()(initialState);
  let helloWrapper: ReactWrapper<
    React.ProviderProps<IMainState> & IHelloReduxProps & IHelloDispatchProps,
    IHelloReactProps>;

  beforeEach(() => {
    helloWrapper = mount<React.ProviderProps<IMainState> & IHelloReduxProps & IHelloDispatchProps>(
      <Provider store={store}>
        <Hello />
      </ Provider>);
  });

  it("click changes redux state", () => {
    expect(helloWrapper.find("#reduxNumber").text()).toEqual("0");
    expect(helloWrapper.find("#reduxString").text()).toEqual("oldReduxData");
    helloWrapper.find("button").simulate("click");
    expect(store.getActions()[0]).toEqual(setReduxStringData({ stringData: "reduxData" }));
  });

});
