import * as constants from "../constants";

export interface SetShopsAction {
  type: constants.SET_SHOPS;
}

export type StoreAction = SetShopsAction;

export function setShopsAction(): SetShopsAction {
  return {
    type: constants.SET_SHOPS
  };
}
