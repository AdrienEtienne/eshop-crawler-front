import { ActionName, ActionStatus } from "../types";

export function isActionLoading(actions: ActionStatus[], name: ActionName) {
  const action = actions.find(el => el.name === "fetch_shops");
  if (action) {
    return action.isLoading;
  }
  return false;
}
