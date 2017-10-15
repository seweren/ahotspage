import ActionCreatorFactory from "redux-typescript-actions";

const actionCreator = ActionCreatorFactory();

export const setCicca = actionCreator<{ cicca: string }>("CICCA");
export const setKuttya = actionCreator<{ kuttya: string }>("KUTTYA");
