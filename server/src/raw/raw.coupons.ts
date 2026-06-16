interface RawCoupon {
  id: number;
  code: string;
  name: string;

  sale: number;

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
