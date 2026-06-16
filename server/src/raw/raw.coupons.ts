// discount
interface DiscountFixedAmount {
  type: "fixedAmount";
  amount: number;
}

interface DiscountPercent {
  type: "percent";
  rate: number;
}

interface DiscountFreeShippingFee {
  type: "freeShippingFee";
}

interface DiscountBOGO {
  type: "bogo";
  buyQuantity: number;
  freeQuantity: number;
}

interface RawCoupon {
  id: number;
  code: string;
  name: string;

  discount:
    | DiscountFixedAmount
    | DiscountPercent
    | DiscountFreeShippingFee
    | DiscountBOGO;

  expirationDate: Date;

  minOrderAmount?: number;
  validTime?: {
    start: string;
    end: string;
  };
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
