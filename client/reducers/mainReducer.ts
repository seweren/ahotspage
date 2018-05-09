import * as clone from "clone";
import { Action, combineReducers } from "redux";
import { isType } from "typescript-fsa";

import { setReduxNumberData, setReduxStringData } from "../actions/mainActions";
import { IMainState } from "../model/mainState";

const stringReducer = (state: string = "", action: Action) => {
  const newState = clone<string>(state);
  if (isType(action, setReduxStringData)) {
    return action.payload.stringData;
  }
  return newState;
};

const numberReducer = (state: number = 0, action: Action) => {
  const newState = clone<number>(state);
  if (isType(action, setReduxNumberData)) {
    return action.payload.numberData;
  }
  return newState;
};

export const mainReducer = combineReducers<IMainState>({
  reduxNumberData: numberReducer,
  reduxStringData: stringReducer,
});
