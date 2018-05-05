import * as clone from "clone";
import { Action, combineReducers } from "redux";
import { isType } from "typescript-fsa";

import { setCicca, setKuttya } from "../actions/mainActions";
import { IMainState } from "../model/mainState";

const ciccaReducer = (state: string = "", action: Action) => {
  const newState = clone<string>(state);
  if (isType(action, setCicca)) {
    return action.payload.cicca;
  }
  if (isType(action, setKuttya)) {
    return action.payload.kuttya;
  }
  return newState;
};

export const mainReducer = combineReducers<IMainState>({
  cicca: ciccaReducer,
});
