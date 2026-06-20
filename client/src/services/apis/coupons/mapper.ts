import type { GetCouponsParams } from "./repository.types";

import type { GetCouponsResponseDto } from "./dto";

// GetCoupons

export const mapGetCouponsModelToRequestDTO = (
  model: GetCouponsParams,
): GetCouponsParams => {
  return model;
};

export const mapGetCouponsResponseDTOToModel = (
  response: GetCouponsResponseDto,
) => {
  return response.data;
};
