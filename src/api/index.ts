import axios from "axios";
import { API_HOST } from "../config";
import { SuccessBodyDto } from "./request";
import { Shop } from "../types";

export async function getShops() {
  const response = await axios.get<SuccessBodyDto<Shop[]>>(
    `${API_HOST}/v1/shops`,
    {
      responseType: "json"
    }
  );
  return response.data;
}
