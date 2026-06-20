import type {
  GetOrderSheetParams,
  PostOrderSheetParams,
  GetOrderSheetPricingParams,
  PatchOrderSheetShippingAreaParams,
  PatchOrderSheetCouponsParams,
  GetOrderSheetAbleCouponsParams,
  GetOrderSheetCouponsDiscountPreviewParams,
} from "./repository.types";

import type {
  GetOrderSheetResponseDto,
  PostOrderSheetResponseDto,
  GetOrderSheetPricingResponseDto,
  PatchOrderSheetShippingAreaResponseDto,
  PatchOrderSheetCouponsResponseDto,
  GetOrderSheetAbleCouponsResponseDto,
  GetOrderSheetCouponsDiscountPreviewResponseDto,
} from "./dto";

// GetOrderSheet
export const mapGetOrderSheetModelToRequestDTO = (
  model: GetOrderSheetParams,
): GetOrderSheetParams => {
  return model;
};

export const mapGetOrderSheetResponseDTOToModel = (
  response: GetOrderSheetResponseDto,
) => {
  return response.data;
};

// PostOrderSheet

export const mapPostOrderSheetModelToRequestDTO = (
  model: PostOrderSheetParams,
): PostOrderSheetParams => {
  return model;
};

export const mapPostOrderSheetResponseDTOToModel = (
  response: PostOrderSheetResponseDto,
) => {
  return response.data;
};

// GetOrderSheetPricing
export const mapGetOrderSheetPricingModelToRequestDTO = (
  model: GetOrderSheetPricingParams,
): GetOrderSheetPricingParams => {
  return model;
};

export const mapGetOrderSheetPricingResponseDTOToModel = (
  response: GetOrderSheetPricingResponseDto,
) => {
  return response.data;
};

// PatchOrderSheetShippingArea

export const mapPatchOrderSheetShippingAreaModelToRequestDTO = (
  model: PatchOrderSheetShippingAreaParams,
): PatchOrderSheetShippingAreaParams => {
  return model;
};

export const mapPatchOrderSheetShippingAreaResponseDTOToModel = (
  response: PatchOrderSheetShippingAreaResponseDto,
) => {
  return response.data;
};

// PatchOrderSheetCoupons

export const mapPatchOrderSheetCouponsModelToRequestDTO = (
  model: PatchOrderSheetCouponsParams,
): PatchOrderSheetCouponsParams => {
  return model;
};

export const mapPatchOrderSheetCouponsResponseDTOToModel = (
  response: PatchOrderSheetCouponsResponseDto,
) => {
  return response.data;
};

// GetOrderSheetAbleCoupons
export const mapGetOrderSheetAbleCouponsModelToRequestDTO = (
  model: GetOrderSheetAbleCouponsParams,
): GetOrderSheetAbleCouponsParams => {
  return model;
};

export const mapGetOrderSheetAbleCouponsResponseDTOToModel = (
  response: GetOrderSheetAbleCouponsResponseDto,
) => {
  return response.data;
};

// GetOrderSheetCouponsDiscountPreview
export const mapGetOrderSheetCouponsDiscountPreviewModelToRequestDTO = (
  model: GetOrderSheetCouponsDiscountPreviewParams,
): GetOrderSheetCouponsDiscountPreviewParams => {
  return model;
};

export const mapGetOrderSheetCouponsDiscountPreviewResponseDTOToModel = (
  response: GetOrderSheetCouponsDiscountPreviewResponseDto,
) => {
  return response.data;
};
