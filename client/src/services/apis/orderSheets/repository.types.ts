// GetOrderSheet
export interface GetOrderSheetParams {}

export type GetOrderSheet = (params: GetOrderSheetParams) => Promise<{}>;
// PostOrderSheet

export interface PostOrderSheetParams {}

export type PostOrderSheet = (params: PostOrderSheetParams) => Promise<{}>;
// GetOrderSheetPricing

export interface GetOrderSheetPricingParams {}

export type GetOrderSheetPricing = (
  params: GetOrderSheetPricingParams,
) => Promise<{}>;
// PatchOrderSheetShippingArea

export interface PatchOrderSheetShippingAreaParams {}

export type PatchOrderSheetShippingArea = (
  params: PatchOrderSheetShippingAreaParams,
) => Promise<{}>;
// PatchOrderSheetCoupons

export interface PatchOrderSheetCouponsParams {}

export type PatchOrderSheetCoupons = (
  params: PatchOrderSheetCouponsParams,
) => Promise<{}>;
// GetOrderSheetAbleCoupons

export interface GetOrderSheetAbleCouponsParams {}

export type GetOrderSheetAbleCoupons = (
  params: GetOrderSheetAbleCouponsParams,
) => Promise<{}>;
// GetOrderSheetCouponsDiscountPreview

export interface GetOrderSheetCouponsDiscountPreviewParams {}

export type GetOrderSheetCouponsDiscountPreview = (
  params: GetOrderSheetCouponsDiscountPreviewParams,
) => Promise<{}>;
