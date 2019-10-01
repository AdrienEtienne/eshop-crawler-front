import { isActionLoading, getPricePercentDiscount } from ".";
import { Price } from "../types";

describe("Selectors", () => {
  describe("isActionLoading", () => {
    it("should return false", () => {
      expect(isActionLoading([], "fetch_shops")).toBeFalsy();
    });
  });

  describe("getPricePercentDiscount", () => {
    it("should return percent", () => {
      expect(
        getPricePercentDiscount({
          amountValue: 10,
          discountAmountValue: 2
        } as Price)
      ).toBe(80);
    });
  });
});
