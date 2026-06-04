import * as fetcher from "./fetcher";

export const getCarts = async ({ cartId }: { cartId: number }) => {
  const response = await fetcher.getCarts({ pathParams: { cartId } });

  return response;
};

export const patchCartsProducts = async ({
  cartId,
  productId,
  quantity,
}: {
  cartId: number;
  productId: number;
  quantity: number;
}) => {
  const response = await fetcher.patchCartsProducts({
    pathParams: { cartId, productId },
    data: { quantity },
  });

  return response;
};

export const deleteCartsProducts = async ({
  cartId,
  productId,
}: {
  cartId: number;
  productId: number;
}) => {
  const response = await fetcher.deleteCartsProducts({
    pathParams: { cartId, productId },
  });

  return response;
};
