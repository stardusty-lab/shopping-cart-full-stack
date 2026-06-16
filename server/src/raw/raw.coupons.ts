// discount
interface FixedAmountDiscount {
  type: "fixedAmount";
  amount: number;
}

interface PercentDiscount {
  type: "percent";
  rate: number;
}

interface FreeShippingFeeDiscount {
  type: "freeShippingFee";
}

interface BuyXGetYDiscount {
  type: "buyXGetY";
  buyQuantity: number;
  freeQuantity: number;
}

// condition

interface CouponCondition {
  minOrderAmount?: number;
  validTime?: {
    start: string;
    end: string;
  };
}

interface RawCoupon {
  id: number;
  code: string;
  name: string;

  discount:
    | FixedAmountDiscount
    | PercentDiscount
    | FreeShippingFeeDiscount
    | BuyXGetYDiscount;

  expirationDate: string;

  condition?: CouponCondition;
}

const createCoupons = () => {
  const rawCoupons: RawCoupon[] = [];
  return rawCoupons;
};

export const couponStore = {
  coupons: createCoupons(),
  reset() {
    this.coupons = createCoupons();
  },
};
