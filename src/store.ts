import {
  applyMiddleware,
  compose,
  createStore,
  StoreEnhancerStoreCreator
} from "redux";
import "redux-devtools-extension";
import thunk, { ThunkAction, ThunkMiddleware } from "redux-thunk";
import { reducer, initialState } from "./reducers";
import { StoreState } from "./types";
import { StoreAction } from "./actions";

export type ThunkResult<R> = ThunkAction<R, StoreState, void, StoreAction>;

const enhancers = [];
export const middlewares = [thunk as ThunkMiddleware<StoreState, StoreAction>];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension =
    // tslint:disable-next-line:no-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    // tslint:disable-next-line:no-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

export const composedEnhancers = compose<
  StoreEnhancerStoreCreator<ThunkMiddleware<StoreState, StoreAction>>
>(
  applyMiddleware(...middlewares),
  ...enhancers
);

export const store = createStore(reducer, initialState, composedEnhancers);
