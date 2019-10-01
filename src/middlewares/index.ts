import { Middleware, Dispatch } from "redux";
import { StoreState } from "../types";
import { StoreAction, fetchGames } from "../actions";
import {
  SET_GAME_FILTER_SEARCH,
  SET_GAME_FILTER_COUNTRIES,
  TOGGLE_GAME_FILTER_ON_SALE
} from "../constants";

let fetchGamesTimeout: NodeJS.Timeout | null = null;

export const resetSearchGamesMiddleware: Middleware<
  Dispatch<StoreAction>,
  StoreState,
  Dispatch<StoreAction>
> = api => next => (action: StoreAction) => {
  switch (action.type) {
    case SET_GAME_FILTER_SEARCH:
    case SET_GAME_FILTER_COUNTRIES:
    case TOGGLE_GAME_FILTER_ON_SALE:
      break;
    default:
      next(action);
      return;
  }

  if (fetchGamesTimeout) {
    clearTimeout(fetchGamesTimeout);
  }

  fetchGamesTimeout = setTimeout(() => {
    api.dispatch((fetchGames({ reset: true }) as unknown) as StoreAction);
  }, 2000);

  return next(action);
};
