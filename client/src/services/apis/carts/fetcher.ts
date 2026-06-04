import { requestAjax } from "@/services/core/http";

import type {
  GetCartsRequestDto,
  GetCartsResponseDto,
  PatchCartsProductsRequestDto,
  PatchCartsProductsResponseDto,
  DeleteCartsProductsRequestDto,
} from "./dto";

export const getCarts = async ({
  pathParams: { cartId },
}: GetCartsRequestDto): Promise<GetCartsResponseDto> => {
  const response = await requestAjax("/carts", {
    method: "get",
    pathParams: { cartId },
  });
  return response.data;
};

export const patchCartsProducts = async ({
  pathParams: { cartId, productId },
  data: { quantity },
}: PatchCartsProductsRequestDto): Promise<PatchCartsProductsResponseDto> => {
  const response = await requestAjax("/carts/products", {
    method: "patch",
    pathParams: { cartId, productId },
    data: { quantity },
  });
  return response.data;
};

export const deleteCartsProducts = async ({
  pathParams: { cartId, productId },
}: DeleteCartsProductsRequestDto) => {
  const response = await requestAjax("/carts/products", {
    method: "delete",
    pathParams: { cartId, productId },
  });
  return response.data;
};
