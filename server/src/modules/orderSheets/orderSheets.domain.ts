export const calculateOrderSheetAmount = (
  products: { price: number; quantity: number }[],
): number => {
  return products.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);
};

export const calculateAppliedShippingFee = (
  orderSheetAmount: number,
  isRemoteArea: boolean,
  hasFreeShippingFeeCoupon: boolean,
  shippingPolicy: {
    baseShippingFee: number;
    remoteAreaAdditionalFee: number;
    freeShippingThreshold: number;
  },
): number => {
  if (orderSheetAmount >= shippingPolicy.freeShippingThreshold) return 0;
  if (hasFreeShippingFeeCoupon) return 0;

  if (isRemoteArea)
    return (
      shippingPolicy.baseShippingFee + shippingPolicy.remoteAreaAdditionalFee
    );

  return shippingPolicy.baseShippingFee;
};
