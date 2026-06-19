import type {
  OrderSheetResponse,
  CreateOrderSheetResponse,
} from "./orderSheets.dto.ts";

import * as orderSheetStore from "./orderSheets.repository.ts";
import * as productsStore from "../products/products.repository.ts";
import * as couponsStore from "../coupons/coupons.repository.ts";

import {
  calculateBestCouponCombination,
  canUseCoupon,
} from "./orderSheets.domain.ts";
import type {
  CanUseCoupon,
  CanUseCouponContext,
} from "./orderSheets.domain.ts";

export const getOrderSheetById = (orderSheetId: number): OrderSheetResponse => {
  const orderSheet = orderSheetStore.findById(orderSheetId);
  if (!orderSheet) throw new Error();

  return {
    orderSheet: {
      items: orderSheet.products.map((product) => {
        const productData = productsStore.findById(product.id);
        if (!productData) throw new Error();

        return {
          product: {
            id: product.id,
            name: productData.name,
            price: productData.price,
            imgUrl: productData.imgUrl,
          },
          quantity: product.quantity,
        };
      }),
      isRemoteShippingArea: orderSheet.isRemoteShippingArea,
      selectedCoupons: orderSheet.selectedCoupons,
    },
  };
};

export const createOrderSheet = (
  products: { id: number; quantity: number }[],
): CreateOrderSheetResponse => {
  const allCoupons = couponsStore.findAll();

  const ableCoupons = allCoupons
    .filter((coupon) => {
      return canUseCoupon(
        coupon as CanUseCoupon,
        {
          orderSheetAmount: 0,
          products,
          now: new Date(),
        } as CanUseCouponContext,
      );
    })
    .map((coupon) => coupon.code);

  const productsData = products
    .map((product) => {
      const productData = productsStore.findById(product.id);
      if (!productData) throw new Error();
      return { price: productData.price, quantity: product.quantity };
    })
    .filter(Boolean);

  const bestCouponCodes = calculateBestCouponCombination(
    productsData,
    ableCoupons,
    3000,
  );

  const bestCouponIds = bestCouponCodes.map((couponCode) => {
    const coupon = allCoupons.find((coupon) => coupon.code === couponCode);
    if (!coupon) throw new Error();
    return coupon.id;
  });

  const orderSheet = {
    products,
    remoteArea: false,
    coupons: bestCouponIds,
  };

  const newOrderSheet = orderSheetStore.create(orderSheet);
  return newOrderSheet;
};
