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

export const calculateCouponDiscountAmount = (
  products: { price: number; quantity: number }[],
  coupons: string[],
  shippingFreeBeforeCoupon: number,
): number => {
  let couponDiscountAmount = 0;

  coupons.forEach((coupon) => {
    const getMaxPriceProductPrice = (
      products: { price: number; quantity: number }[],
    ): number => {
      const bogoProducts = products.filter((product) => product.quantity >= 3);
      const sortedProduct = bogoProducts.sort((a, b) => b.price - a.price);

      const maxPriceProduct = sortedProduct[0];

      return maxPriceProduct.price;
    };
    switch (coupon) {
      case "FIXED5000":
        couponDiscountAmount += 5000;
        break;
      case "BOGO":
        const maxPriceProduct = getMaxPriceProductPrice(products);
        couponDiscountAmount += maxPriceProduct;
        break;
      case "FREESHIPPING":
        couponDiscountAmount += shippingFreeBeforeCoupon;
        break;
      case "MIRACLESALE":
        const orderSheetAmount = calculateOrderSheetAmount(products);
        couponDiscountAmount += orderSheetAmount * 0.3;
        break;
      default:
        break;
    }
  });

  return couponDiscountAmount;
};
