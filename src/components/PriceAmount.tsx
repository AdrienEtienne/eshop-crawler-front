import React from "react";
import { Alert } from "reactstrap";
import { Price } from "../types";
import { getPricePercentDiscount } from "../selectors.ts";
import { kebabCase } from "lodash";

export default function PriceAmount({
  price,
  country
}: {
  price: Price;
  country?: string;
}) {
  let color = "success";
  const discount = getPricePercentDiscount(price);
  if (discount >= 70) {
    color = "danger";
  } else if (discount >= 50) {
    color = "warning";
  } else if (discount >= 30) {
    color = "primary";
  }

  let amount = <span className="px-1">{price.amount}</span>;
  let discountAmount = null;

  if (price.discountAmount) {
    amount = (
      <small>
        <del className="px-1">{amount}</del>
      </small>
    );
    discountAmount = <span>{price.discountAmount}</span>;
  }

  return (
    <Alert
      color={color}
      className={[
        "p-1",
        "m-0",
        "rounded-0",
        "border-0",
        "d-flex",
        "justify-content-center",
        "align-items-center"
      ].join(" ")}
    >
      {country ? (
        <img
          src={`${process.env.PUBLIC_URL}/img/flags/${kebabCase(
            country.toLowerCase()
          )}.svg`}
          alt={country}
          style={{ width: 25 }}
          className="mr-1"
        />
      ) : null}
      {discountAmount}
      {amount}
    </Alert>
  );
}
