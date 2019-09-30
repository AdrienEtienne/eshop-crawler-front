import { Region } from "nintendo-switch-eshop";

export interface StoreState {
  actions: ActionStatus[];
  gamesFilter: {
    countries: string[];
    onSale: boolean;
    search: string;
  };
  shops: Shop[];
}

export type ActionName = "fetch_shops";
export interface ActionStatus {
  name: ActionName;
  isLoading: boolean;
}

export interface Shop {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  code: string;
  country: string;
  currency: string;
  region: Region;
}
