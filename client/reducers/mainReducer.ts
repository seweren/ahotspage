import * as clone from "clone";
import { Action, combineReducers } from "redux";
import { isType } from "redux-typescript-actions";

import { setCicca } from "../actions/mainActions";
import { IMainState } from "../model/mainState";

const ciccaReducer = (state: string = "", action: Action) => {
  const newState = clone<string>(state);
  if (isType(action, setCicca)) {
    return action.payload;
  }
  return newState;
};

export const mainReducer = combineReducers<IMainState>({
  cicca: ciccaReducer,
});
