import { StoreAction } from "../actions";
import { StoreState } from "../types";
import { SET_SHOPS, SET_ACTION_STATUS } from "../constants";
import { Reducer } from "redux";
import { cloneDeep } from "lodash";

export const initialState: StoreState = {
  actions: [],
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
      return { ...state, shops: action.payload.shops };
  }
  return state;
};
