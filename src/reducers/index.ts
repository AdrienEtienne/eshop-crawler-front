import { StoreAction } from "../actions";
import { StoreState } from "../types";
import {
  SET_SHOPS,
  SET_ACTION_STATUS,
  SET_GAME_FILTER_SEARCH,
  TOGGLE_GAME_FILTER_ON_SALE,
  SET_GAME_FILTER_COUNTRIES,
  ADD_GAMES,
  RESET_GAMES
} from "../constants";
import { Reducer } from "redux";
import { cloneDeep, orderBy } from "lodash";

export const initialState: StoreState = {
  actions: [],
  games: [],
  gamesFilter: {
    countries: [],
    onSale: false,
    search: ""
  },
  gamesPage: {
    current: 0,
    items: 0,
    itemsTotal: 0
  },
  shops: []
};

export const reducer: Reducer<StoreState, StoreAction> = (
  state = initialState,
  action
): StoreState => {
  switch (action.type) {
    case SET_ACTION_STATUS:
      return {
        ...state,
        actions: [
          ...cloneDeep(state.actions).filter(
            el => el.name !== action.payload.name
          ),
          action.payload
        ]
      };
    case SET_SHOPS:
      return {
        ...state,
        shops: orderBy(action.payload.shops, el => el.country)
      };
    case SET_GAME_FILTER_SEARCH:
      return {
        ...state,
        gamesFilter: {
          ...state.gamesFilter,
          search: action.payload.search
        }
      };
    case SET_GAME_FILTER_COUNTRIES:
      return {
        ...state,
        gamesFilter: {
          ...state.gamesFilter,
          countries: action.payload.countries
        }
      };
    case TOGGLE_GAME_FILTER_ON_SALE:
      return {
        ...state,
        gamesFilter: {
          ...state.gamesFilter,
          onSale: !state.gamesFilter.onSale
        }
      };
    case ADD_GAMES:
      return {
        ...state,
        games: [...state.games, ...action.payload.games],
        gamesPage: action.payload.pagination
      };
    case RESET_GAMES:
      return {
        ...state,
        games: [],
        gamesPage: {
          current: 0,
          items: 0,
          itemsTotal: 0
        }
      };
  }
  return state;
};
