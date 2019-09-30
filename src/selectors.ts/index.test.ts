import { isActionLoading } from ".";

describe("Selectors", () => {
  describe("isActionLoading", () => {
    it("should return false", () => {
      expect(isActionLoading([], "fetch_shops")).toBeFalsy();
    });
  });
});
