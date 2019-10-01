import axios from "axios";
import { stringify } from "query-string";
import { API_HOST } from "../config";
import { SuccessBodyDto } from "./request";
import { Shop, Game } from "../types";

export async function getShops() {
  const response = await axios.get<SuccessBodyDto<Shop[]>>(
    `${API_HOST}/v1/shops`,
    {
      responseType: "json"
    }
  );
  return response.data;
}

export async function getGames(options: {
  search: string;
  countries: string[];
  sales: boolean;
  page: number;
}) {
  const query = stringify(options, { arrayFormat: "comma" });

  const response = await axios.get<SuccessBodyDto<Game[]>>(
    `${API_HOST}/v1/games?${query}`,
    {
      responseType: "json"
    }
  );
  return response.data;
}
