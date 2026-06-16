interface RawProductInOrderSheet {
  id: number;
  quantity: number;
}

type RawCoupon = number;

interface RawOrderSheet {
  id: number;
  products: RawProductInOrderSheet[];
  remoteArea: boolean;
  coupons: RawCoupon[];
}

const createOrderSheets = () => {
  const rawOrderSheets: RawOrderSheet[] = [];
  return rawOrderSheets;
};

export const shippingFeeStore = {
  orderSheets: createOrderSheets(),
  reset() {
    this.orderSheets = createOrderSheets();
  },
};
