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

interface BOGODiscount {
  type: "bogo";
  buyQuantity: number;
  freeQuantity: number;
}

interface RawCoupon {
  id: number;
  code: string;
  name: string;

  discount:
    | FixedAmountDiscount
    | PercentDiscount
    | FreeShippingFeeDiscount
    | BOGODiscount;

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
