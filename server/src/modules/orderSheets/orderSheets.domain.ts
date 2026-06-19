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
  const couponOrder = ["FIXED5000", "BOGO", "MIRACLESALE", "FREESHIPPING"];

  const orderedCoupons: string[] = [];
  couponOrder.forEach((order) => {
    if (coupons.includes(order)) orderedCoupons.push(order);
  });

  const calculateCouponDiscount = {
    fixedAmount: (discount: { type: "fixedAmount"; amount: number }) => {
      return discount.amount;
    },
    buyXGetY: (
      discount: { type: "buyXGetY"; buyQuantity: number; freeQuantity: number },
      products: { price: number; quantity: number }[],
    ) => {
      const getMaxPriceProductPrice = (
        products: { price: number; quantity: number }[],
      ): number => {
        const bogoProducts = products.filter(
          (product) =>
            product.quantity >= discount.buyQuantity + discount.freeQuantity,
        );
        const sortedProduct = bogoProducts.sort((a, b) => b.price - a.price);

        const maxPriceProduct = sortedProduct[0];

        return maxPriceProduct.price * discount.freeQuantity;
      };

      const maxPriceProduct = getMaxPriceProductPrice(products);
      return maxPriceProduct;
    },
    percent: (
      discount: { type: "percent"; rate: number },
      products: { price: number; quantity: number }[],
      prevDiscountAmount: number,
    ) => {
      const orderSheetAmount =
        calculateOrderSheetAmount(products) - prevDiscountAmount;
      return orderSheetAmount * discount.rate;
    },
    freeShippingFee: (
      discount: { type: "freeShippingFee" },
      products: { price: number; quantity: number }[],
      shippingFreeBeforeCoupon: number,
    ) => {
      return shippingFreeBeforeCoupon;
    },
  };

  const couponCODEs = {
    FIXED5000: {
      type: "fixedAmount",
      amount: 5000,
    },
    BOGO: {
      type: "buyXGetY",
      buyQuantity: 2,
      freeQuantity: 1,
    },
    MIRACLESALE: {
      type: "percent",
      rate: 0.3,
    },
    FREESHIPPING: {
      type: "freeShippingFee",
    },
  };

  return orderedCoupons.reduce((prevDiscountAmount: number, coupon: string) => {
    const discount = couponCODEs[coupon as keyof typeof couponCODEs];
    if (!discount) return prevDiscountAmount;

    const discountType = discount.type;

    const calculate =
      calculateCouponDiscount[
        discountType as keyof typeof calculateCouponDiscount
      ];
    if (!calculate) return prevDiscountAmount;

    prevDiscountAmount += calculate(discount, products, prevDiscountAmount);
    return prevDiscountAmount;
  }, 0);
};

export const calculatePaymentAmount = (
  orderSheetAmount: number,
  couponDiscountAmount: number,
  appliedShippingFee: number,
): number => {
  return orderSheetAmount - couponDiscountAmount + appliedShippingFee;
};
