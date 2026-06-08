import * as fetcher from "./fetcher";
import {
  mapGetCartsModelToRequestDTO,
  mapGetCartsResponseDTOToModel,
  mapPatchCartsProductsModelToRequestDTO,
  mapPatchCartsProductsResponseDTOToModel,
  mapDeleteCartsProductsModelToRequestDTO,
  mapDeleteCartsProductsResponseDTOToModel,
} from "./mapper";

import type {
  GetCarts,
  PatchCartsProducts,
  DeleteCartsProducts,
} from "./repository.types";

export const getCarts: GetCarts = async (model) => {
  const { cartId } = mapGetCartsModelToRequestDTO(model);

  const responseDTO = await fetcher.getCarts({
    pathParams: [{ name: "cartId", value: cartId }],
  });

  return mapGetCartsResponseDTOToModel(responseDTO);
};

export const patchCartsProducts: PatchCartsProducts = async (model) => {
  const { cartId, productId, quantity } =
    mapPatchCartsProductsModelToRequestDTO(model);

  const responseDTO = await fetcher.patchCartsProducts({
    pathParams: [
      { name: "cartId", value: cartId },
      { name: "productId", value: productId },
    ],
    data: { quantity },
  });

  return mapPatchCartsProductsResponseDTOToModel(responseDTO);
};

export const deleteCartsProducts: DeleteCartsProducts = async (model) => {
  const { cartId, productId } = mapDeleteCartsProductsModelToRequestDTO(model);

  const responseDTO = await fetcher.deleteCartsProducts({
    pathParams: [
      { name: "cartId", value: cartId },
      { name: "productId", value: productId },
    ],
  });

  return mapDeleteCartsProductsResponseDTOToModel(responseDTO);
};
