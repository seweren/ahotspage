import ActionCreatorFactory from "typescript-fsa";

const actionCreator = ActionCreatorFactory("main");

export const setReduxStringData = actionCreator<{ stringData: string }>("STRING_DATA");
export const setReduxNumberData = actionCreator<{ numberData: number }>("NUMBER_DATA");
