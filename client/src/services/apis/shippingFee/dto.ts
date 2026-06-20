import type { ResponseDTO } from "@/services/apis/api.types";

export interface GetShippingFeeRequestDto {
  pathParams: {};
  query: {};
  data: {};
}

export type GetShippingFeeResponseDto = ResponseDTO<200, {}>;
