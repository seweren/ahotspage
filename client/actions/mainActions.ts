import ActionCreatorFactory from "typescript-fsa";

const actionCreator = ActionCreatorFactory();

export const setCicca = actionCreator<{ cicca: string }>("CICCA");
export const setKuttya = actionCreator<{ kuttya: string }>("KUTTYA");
