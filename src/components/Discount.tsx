import React from "react";
import { Alert } from "reactstrap";

export default function Discount({ discount }: { discount: number }) {
  let color = "success";
  if (discount >= 70) {
    color = "danger";
  } else if (discount >= 50) {
    color = "warning";
  } else if (discount >= 30) {
    color = "primary";
  }

  return (
    <Alert color={color} className="p-1 rounded-0">
      {`${Math.round(discount)}% Off`}
    </Alert>
  );
}
