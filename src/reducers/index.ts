import { StoreAction } from "../actions";
import { StoreState } from "../types/index";
import { SET_SHOPS } from "../constants/index";
import { Reducer } from "redux";

export const initialState: StoreState = {
  shops: []
};

export const reducer: Reducer<StoreState, StoreAction> = (
  state = initialState,
  action
): StoreState => {
  switch (action.type) {
    case SET_SHOPS:
      return { ...state, shops: ["shop"] };
  }
  return state;
};
