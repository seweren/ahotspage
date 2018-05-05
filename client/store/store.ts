import { createStore } from "redux";
import { persistStore } from "redux-persist";

import { IMainState } from "../model/mainState";
import { mainReducer } from "../reducers/mainReducer";

const devToolsExtension: any =
  process.env.NODE_ENV !== "production" && (window as any).devToolsExtension;

export const store = createStore<IMainState, any, any, any>(
  mainReducer,
  undefined,
  devToolsExtension ? devToolsExtension() : (f: any) => f,
);

persistStore(store);
