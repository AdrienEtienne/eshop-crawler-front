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

export interface SetSearchGamesFilterAction {
  type: constants.SET_GAME_FILTER_SEARCH;
  payload: {
    search: string;
  };
}

export interface SetCountriesGamesFilterAction {
  type: constants.SET_GAME_FILTER_COUNTRIES;
  payload: {
    countries: string[];
  };
}

export interface ToggleOnSaleGamesFilterAction {
  type: constants.TOGGLE_GAME_FILTER_ON_SALE;
}

export type StoreAction =
  | SetActionStatusAction
  | SetShopsAction
  | SetSearchGamesFilterAction
  | SetCountriesGamesFilterAction
  | ToggleOnSaleGamesFilterAction;

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

export function setSearchGamesFilter(search = ""): SetSearchGamesFilterAction {
  return {
    type: constants.SET_GAME_FILTER_SEARCH,
    payload: { search }
  };
}

export function setCountriesGamesFilter(
  countries: string[]
): SetCountriesGamesFilterAction {
  return {
    type: constants.SET_GAME_FILTER_COUNTRIES,
    payload: { countries }
  };
}

export function toggleOnSaleGamesFilter(): ToggleOnSaleGamesFilterAction {
  return {
    type: constants.TOGGLE_GAME_FILTER_ON_SALE
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
