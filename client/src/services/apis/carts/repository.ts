import * as fetcher from "./fetcher";

import type {
  GetCarts,
  PatchCartsProducts,
  DeleteCartsProducts,
} from "./repository.types";

export const getCarts: GetCarts = async ({ cartId }) => {
  const response = await fetcher.getCarts({ pathParams: { cartId } });

  return response;
};

export const patchCartsProducts: PatchCartsProducts = async ({
  cartId,
  productId,
  quantity,
}) => {
  const response = await fetcher.patchCartsProducts({
    pathParams: { cartId, productId },
    data: { quantity },
  });

  return response;
};

export const deleteCartsProducts: DeleteCartsProducts = async ({
  cartId,
  productId,
}) => {
  const response = await fetcher.deleteCartsProducts({
    pathParams: { cartId, productId },
  });

  return response;
};
