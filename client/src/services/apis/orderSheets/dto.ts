import type { ResponseDTO } from "@/services/apis/api.types";

// GetOrderSheet
export interface GetOrderSheetRequestDto {
  pathParams: {};
  query: {};
  data: {};
}

export type GetOrderSheetResponseDto = ResponseDTO<200, {}>;

// PostOrderSheet
export interface PostOrderSheetRequestDto {
  pathParams: {};
  query: {};
  data: {};
}

export type PostOrderSheetResponseDto = ResponseDTO<200, {}>;

// GetOrderSheetPricing
export interface GetOrderSheetPricingRequestDto {
  pathParams: {};
  query: {};
  data: {};
}

export type GetOrderSheetPricingResponseDto = ResponseDTO<200, {}>;

// PatchOrderSheetShippingArea
export interface PatchOrderSheetShippingAreaRequestDto {
  pathParams: {};
  query: {};
  data: {};
}

export type PatchOrderSheetShippingAreaResponseDto = ResponseDTO<200, {}>;

// PatchOrderSheetCoupons
export interface PatchOrderSheetCouponsRequestDto {
  pathParams: {};
  query: {};
  data: {};
}

export type PatchOrderSheetCouponsResponseDto = ResponseDTO<200, {}>;

// GetOrderSheetAbleCoupons
export interface GetOrderSheetAbleCouponsRequestDto {
  pathParams: {};
  query: {};
  data: {};
}

export type GetOrderSheetAbleCouponsResponseDto = ResponseDTO<200, {}>;

// GetOrderSheetCouponsDiscountPreview
export interface GetOrderSheetCouponsDiscountPreviewRequestDto {
  pathParams: {};
  query: {};
  data: {};
}

export type GetOrderSheetCouponsDiscountPreviewResponseDto = ResponseDTO<
  200,
  {}
>;
