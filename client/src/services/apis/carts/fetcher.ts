import { requestAjax } from "@/services/core/http";

import type {
  GetCartsRequestDto,
  GetCartsResponseDto,
  PatchCartsProductsRequestDto,
  PatchCartsProductsResponseDto,
  DeleteCartsProductsRequestDto,
} from "./dto";

export const getCarts = async ({
  pathParams: [{ value: cartId }],
}: GetCartsRequestDto): Promise<GetCartsResponseDto> => {
  const response = await requestAjax("/carts", {
    method: "get",
    pathParams: [{ name: "cartId", value: cartId }],
  });

  return response.data;
};

export const patchCartsProducts = async ({
  pathParams: [{ value: cartId }, { value: productId }],
  data: { quantity },
}: PatchCartsProductsRequestDto): Promise<PatchCartsProductsResponseDto> => {
  const response = await requestAjax(`/carts/${cartId}/products`, {
    method: "patch",
    pathParams: [{ name: "productId", value: productId }],
    data: { quantity },
  });
  return response.data;
};

export const deleteCartsProducts = async ({
  pathParams: [{ value: cartId }, { value: productId }],
}: DeleteCartsProductsRequestDto) => {
  const response = await requestAjax(`/carts/${cartId}/products`, {
    method: "delete",
    pathParams: [{ name: "productId", value: productId }],
  });
  return response.data;
};
