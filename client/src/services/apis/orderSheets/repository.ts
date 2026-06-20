import * as fetcher from "./fetcher";

import {
  // mapGetOrderSheet
  mapGetOrderSheetModelToRequestDTO,
  mapGetOrderSheetResponseDTOToModel,
  // mapPostOrderSheet
  mapPostOrderSheetModelToRequestDTO,
  mapPostOrderSheetResponseDTOToModel,
  // mapGetOrderSheetPricing
  mapGetOrderSheetPricingModelToRequestDTO,
  mapGetOrderSheetPricingResponseDTOToModel,
  // mapPatchOrderSheetShippingArea
  mapPatchOrderSheetShippingAreaModelToRequestDTO,
  mapPatchOrderSheetShippingAreaResponseDTOToModel,
  // mapPatchOrderSheetCoupons
  mapPatchOrderSheetCouponsModelToRequestDTO,
  mapPatchOrderSheetCouponsResponseDTOToModel,
  // mapGetOrderSheetAbleCoupons
  mapGetOrderSheetAbleCouponsModelToRequestDTO,
  mapGetOrderSheetAbleCouponsResponseDTOToModel,
  // mapGetOrderSheetCouponsDiscountPreview
  mapGetOrderSheetCouponsDiscountPreviewModelToRequestDTO,
  mapGetOrderSheetCouponsDiscountPreviewResponseDTOToModel,
} from "./mapper";

import type {
  GetOrderSheet,
  PostOrderSheet,
  GetOrderSheetPricing,
  PatchOrderSheetShippingArea,
  PatchOrderSheetCoupons,
  GetOrderSheetAbleCoupons,
  GetOrderSheetCouponsDiscountPreview,
} from "./repository.types";

export const getOrderSheet: GetOrderSheet = async (model) => {
  const {} = mapGetOrderSheetModelToRequestDTO(model);

  const responseDTO = await fetcher.getOrderSheet({});

  return mapGetOrderSheetResponseDTOToModel(responseDTO.data);
};

export const postOrderSheet: PostOrderSheet = async (model) => {
  const {} = mapPostOrderSheetModelToRequestDTO(model);

  const responseDTO = await fetcher.postOrderSheet({});

  return mapPostOrderSheetResponseDTOToModel(responseDTO.data);
};

export const getOrderSheetPricing: GetOrderSheetPricing = async (model) => {
  const {} = mapGetOrderSheetPricingModelToRequestDTO(model);

  const responseDTO = await fetcher.getOrderSheetPricing({});

  return mapGetOrderSheetPricingResponseDTOToModel(responseDTO.data);
};

export const patchOrderSheetShippingArea: PatchOrderSheetShippingArea = async (
  model,
) => {
  const {} = mapPatchOrderSheetShippingAreaModelToRequestDTO(model);

  const responseDTO = await fetcher.patchOrderSheetShippingArea({});

  return mapPatchOrderSheetShippingAreaResponseDTOToModel(responseDTO.data);
};

export const patchOrderSheetCoupons: PatchOrderSheetCoupons = async (model) => {
  const {} = mapPatchOrderSheetCouponsModelToRequestDTO(model);

  const responseDTO = await fetcher.patchOrderSheetCoupons({});

  return mapPatchOrderSheetCouponsResponseDTOToModel(responseDTO.data);
};

export const getOrderSheetAbleCoupons: GetOrderSheetAbleCoupons = async (
  model,
) => {
  const {} = mapGetOrderSheetAbleCouponsModelToRequestDTO(model);

  const responseDTO = await fetcher.getOrderSheetAbleCoupons({});

  return mapGetOrderSheetAbleCouponsResponseDTOToModel(responseDTO.data);
};

export const getOrderSheetCouponsDiscountPreview: GetOrderSheetCouponsDiscountPreview =
  async (model) => {
    const {} = mapGetOrderSheetCouponsDiscountPreviewModelToRequestDTO(model);

    const responseDTO = await fetcher.getOrderSheetCouponsDiscountPreview({});

    return mapGetOrderSheetCouponsDiscountPreviewResponseDTOToModel(
      responseDTO.data,
    );
  };
