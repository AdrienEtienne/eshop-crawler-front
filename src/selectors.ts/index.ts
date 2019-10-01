import { ActionName, ActionStatus, Price, Shop } from "../types";
import { orderBy, take } from "lodash";

export function isActionLoading(actions: ActionStatus[], name: ActionName) {
  const action = actions.find(el => el.name === name);
  if (action) {
    return action.isLoading;
  }
  return false;
}

export function getPricePercentDiscount(price: Price) {
  let result: number = 0;

  if (price.discountAmountValue) {
    result = 100 - (100 * price.discountAmountValue) / price.amountValue;
  }

  return result;
}

export function getBetterDiscount(prices: Price[]) {
  let result: Price | null = null;
  let discount = 0;

  for (const price of prices) {
    const tmp = getPricePercentDiscount(price);
    if (tmp > discount) {
      result = price;
      discount = tmp;
    }
  }

  return result;
}

export function getBetterDiscounts(prices: Price[], numTake: number = 3) {
  prices = orderBy(prices, price => getPricePercentDiscount(price), "desc");

  return take(prices, numTake);
}

export function getShopPrices(prices: Price[], shops: Shop[]) {
  if (shops.length === 0) {
    return prices;
  }

  const shopIds = shops.map(el => el.id);

  return prices.filter(price => {
    return shopIds.includes(price.shopId);
  });
}
