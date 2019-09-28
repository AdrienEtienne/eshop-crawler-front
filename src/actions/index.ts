import * as constants from "../constants";
import { ActionName, Shop } from "../types";
import { ThunkResult } from "../store";
import { getShops } from "../api";

export interface SetActionStatusAction {
  type: constants.SET_ACTION_STATUS;
  payload: {
    name: ActionName;
    isLoading: boolean;
  };
}

export interface SetShopsAction {
  type: constants.SET_SHOPS;
  payload: {
    shops: Shop[];
  };
}

export type StoreAction = SetActionStatusAction | SetShopsAction;

export function setActionStatus(
  name: ActionName,
  isLoading: boolean
): SetActionStatusAction {
  return {
    type: constants.SET_ACTION_STATUS,
    payload: {
      name,
      isLoading
    }
  };
}

export function setShopsAction(shops: Shop[]): SetShopsAction {
  return {
    type: constants.SET_SHOPS,
    payload: { shops }
  };
}

export function fetchShops(): ThunkResult<Promise<void>> {
  return async dispatch => {
    dispatch(setActionStatus("fetch_shops", true));
    try {
      const body = await getShops();
      dispatch(setShopsAction(body.result));
      dispatch(setActionStatus("fetch_shops", false));
    } catch (error) {
      dispatch(setActionStatus("fetch_shops", false));
    }
  };
}
