import {
  calculateOrderSheetAmount,
  calculateAppliedShippingFee,
  calculateCouponDiscountAmount,
} from "./orderSheets.domain.ts";

const DEFAULT_SHIPPING_POLICY = {
  baseShippingFee: 3000,
  remoteAreaAdditionalFee: 3000,
  freeShippingThreshold: 50000,
};

describe("주문서 금액 요약 정보 계산", () => {
  describe("주문금액 계산", () => {
    it("상품 가격과 수량을 곱해 주문금액을 계산한다", () => {
      // Arrange
      const products = [
        { price: 18000, quantity: 2 },
        { price: 9900, quantity: 1 },
      ];
      const expectedOrderSheetAmount = 45900;

      // Act
      const result = calculateOrderSheetAmount(products);

      // Assert
      expect(result).toBe(expectedOrderSheetAmount);
    });
  });

  describe("최종 배송비 계산", () => {
    it("무료 배송 기준에 못 미치는 경우 기본 배송비가 적용된다", () => {
      // Arrange
      const orderSheetAmount = 45900;
      const isRemoteArea = false;
      const hasFreeShippingFeeCoupon = false;

      const expectedShippingFee = 3000;

      // Act
      const result = calculateAppliedShippingFee(
        orderSheetAmount,
        isRemoteArea,
        hasFreeShippingFeeCoupon,
        DEFAULT_SHIPPING_POLICY,
      );

      // Assert
      expect(result).toBe(expectedShippingFee);
    });
    it("도서산간 지역인 경우 추가 배송비가 적용된다", () => {
      // Arrange
      const orderSheetAmount = 45900;
      const isRemoteArea = true;
      const hasFreeShippingFeeCoupon = false;

      const expectedShippingFee = 6000;

      // Act
      const result = calculateAppliedShippingFee(
        orderSheetAmount,
        isRemoteArea,
        hasFreeShippingFeeCoupon,
        DEFAULT_SHIPPING_POLICY,
      );

      // Assert
      expect(result).toBe(expectedShippingFee);
    });
    it("무료 배송 조건을 만족하면 배송비가 면제된다", () => {
      // Arrange
      const orderSheetAmount = 50000;
      const isRemoteArea = false;
      const hasFreeShippingFeeCoupon = false;

      const expectedShippingFee = 0;

      // Act
      const result = calculateAppliedShippingFee(
        orderSheetAmount,
        isRemoteArea,
        hasFreeShippingFeeCoupon,
        DEFAULT_SHIPPING_POLICY,
      );

      // Assert
      expect(result).toBe(expectedShippingFee);
    });
    it("무료 배송 쿠폰을 사용하면 배송비가 면제된다", () => {
      // Arrange
      const orderSheetAmount = 49500;
      const isRemoteArea = false;
      const hasFreeShippingFeeCoupon = true;

      const expectedShippingFee = 0;

      // Act
      const result = calculateAppliedShippingFee(
        orderSheetAmount,
        isRemoteArea,
        hasFreeShippingFeeCoupon,
        DEFAULT_SHIPPING_POLICY,
      );

      // Assert
      expect(result).toBe(expectedShippingFee);
    });
  });

  describe("쿠폰 할인금액 계산", () => {
    it("5000원 할인 쿠폰을 사용하면 할인금액에 반영한다", () => {
      // Arrange
      const products = [
        { price: 18000, quantity: 2 },
        { price: 32000, quantity: 2 },
      ];
      const coupons = ["FIXED5000"];
      const shippingFree = 3000;

      const expectedDiscountCouponAmount = 5000;

      // Act
      const result = calculateCouponDiscountAmount(
        products,
        coupons,
        shippingFree,
      );

      // Assert
      expect(result).toBe(expectedDiscountCouponAmount);
    });
    it("2 + 1 BOGO 쿠폰을 사용하면 할인금액에 반영한다", () => {});
    it("30% 할인 쿠폰을 사용하면 할인금액에 반영한다", () => {});
  });

  describe("총 결제 금액 계산", () => {
    it("주문금액 - 쿠폰 할인 금액 + 최종 배송비로 총 결제 금액을 계산한다", () => {});
  });
});

describe("사용 가능한 쿠폰 계산", () => {});

describe("최대 2개의 최적 쿠폰 조합 계산", () => {});
