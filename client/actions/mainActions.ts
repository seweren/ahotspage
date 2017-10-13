import ActionCreatorFactory from "redux-typescript-actions";

const actionCreator = ActionCreatorFactory();

export const setCicca = actionCreator<string>("CICCA");
