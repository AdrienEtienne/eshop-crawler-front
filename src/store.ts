import {
  applyMiddleware,
  compose,
  createStore,
  StoreEnhancerStoreCreator,
  Dispatch as ReduxDispatch
} from "redux";
import "redux-devtools-extension";
import thunk, { ThunkAction, ThunkMiddleware } from "redux-thunk";
import { reducer, initialState } from "./reducers";
import { StoreState } from "./types";
import { StoreAction, fetchShops, fetchGames } from "./actions";
import { resetSearchGamesMiddleware } from "./middlewares";

export type ThunkResult<R> = ThunkAction<R, StoreState, undefined, StoreAction>;
export type Dispatch = ReduxDispatch<StoreAction>;

const enhancers = [];
export const middlewares = [
  thunk as ThunkMiddleware<StoreState, StoreAction>,
  resetSearchGamesMiddleware
];

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

store.dispatch((fetchShops() as unknown) as StoreAction);
store.dispatch((fetchGames() as unknown) as StoreAction);
