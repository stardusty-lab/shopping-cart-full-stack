import { requestAjax } from "@/services/core/http";

// getOrderSheet
export const getOrderSheet = async () => {
  const response = await requestAjax("/order-sheet/:orderSheetId", {
    method: "get",
  });

  return response.data;
};

// postOrderSheet
export const postOrderSheet = async () => {
  const response = await requestAjax("/order-sheet", {
    method: "post",
  });

  return response.data;
};

// getOrderSheetPricing
export const getOrderSheetPricing = async () => {
  const response = await requestAjax("/order-sheet/:id/pricing", {
    method: "get",
  });

  return response.data;
};

// patchOrderSheetShippingArea
export const patchOrderSheetShippingArea = async () => {
  const response = await requestAjax("/order-sheet/:id/shipping-area", {
    method: "patch",
  });

  return response.data;
};

// patchOrderSheetCoupons
export const patchOrderSheetCoupons = async () => {
  const response = await requestAjax("/order-sheet/:id/coupons", {
    method: "patch",
  });

  return response.data;
};

// getOrderSheetAbleCoupons
export const getOrderSheetAbleCoupons = async () => {
  const response = await requestAjax("/order-sheet/:id/able-coupons", {
    method: "get",
  });

  return response.data;
};

// getOrderSheetCouponsDiscountPreview
export const getOrderSheetCouponsDiscountPreview = async () => {
  const response = await requestAjax(
    "/order-sheet/:id/coupon-discount-preview",
    {
      method: "get",
    },
  );

  return response.data;
};
