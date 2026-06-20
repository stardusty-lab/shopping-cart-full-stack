import type { GetShippingFeeParams } from "./repository.types";

import type { GetShippingFeeResponseDto } from "./dto";

// GetShippingFee

export const mapGetShippingFeeModelToRequestDTO = (
  model: GetShippingFeeParams,
): GetShippingFeeParams => {
  return model;
};

export const mapGetShippingFeeResponseDTOToModel = (
  response: GetShippingFeeResponseDto,
) => {
  return response.data;
};
