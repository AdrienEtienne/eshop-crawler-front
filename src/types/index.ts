import { Region } from "nintendo-switch-eshop";
import { MetaPagination } from "../api/request";

export interface StoreState {
  actions: ActionStatus[];
  games: Game[];
  gamesFilter: {
    countries: string[];
    onSale: boolean;
    search: string;
  };
  gamesPage: MetaPagination;
  shops: Shop[];
}

export type ActionName = "fetch_shops" | "fetch_games";
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

export interface Game {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  titleSlug: string;
  euId: string | null;
  americaId: string | null;
  jpId: string | null;
  description: string | null;
  descriptionShort: string | null;
  euReleaseDate: string | null;
  americaReleaseDate: string | null;
  jpReleaseDate: string | null;
  euUrl: string | null;
  euImageUrl: string | null;
  americaUrl: string | null;
  japanUrl: string | null;
  prices: Price[];
}

export interface Price {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  gameId: string;
  shopId: string;
  currency: string;
  amount: string;
  amountValue: number;
  onSale: boolean;
  discountAmount: string | null;
  discountAmountValue: number | null;
}
