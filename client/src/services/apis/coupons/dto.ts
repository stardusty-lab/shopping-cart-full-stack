import type { ResponseDTO } from "@/services/apis/api.types";

export interface GetCouponsRequestDto {
  pathParams: {};
  query: {};
  data: {};
}

export type GetCouponsResponseDto = ResponseDTO<200, {}>;
