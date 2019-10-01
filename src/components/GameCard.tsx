import React from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { Game, Shop } from "../types";
import {
  getBetterDiscount,
  getPricePercentDiscount,
  getShopPrices
} from "../selectors.ts";
import Discount from "./Discount";
import { PriceAmountContainer } from "../containers/PriceAmount";

export default function GameCard({
  game,
  shops
}: {
  game: Game;
  shops: Shop[];
}) {
  let img = null;

  if (game.euImageUrl) {
    img = (
      <CardImg top width="100%" src={game.euImageUrl || ""} alt={game.title} />
    );
  }

  const prices = getShopPrices(game.prices, shops);

  let bestDiscountPrice = getBetterDiscount(prices);
  let bestDiscountPriceComponent = null;
  if (bestDiscountPrice) {
    bestDiscountPriceComponent = (
      <div className="position-absolute" style={{ right: 0 }}>
        <Discount discount={getPricePercentDiscount(bestDiscountPrice)} />
      </div>
    );
  }

  let lstPrices = null;
  if (shops.length > 0) {
    lstPrices = (
      <CardBody className="p-0">
        {prices.map((price, key) => (
          <PriceAmountContainer key={key} price={price} />
        ))}
      </CardBody>
    );
  }

  return (
    <Card className="text-dark" color="light">
      {bestDiscountPriceComponent}
      {img}
      <CardBody className="text-center">{game.title}</CardBody>
      {lstPrices}
    </Card>
  );
}
