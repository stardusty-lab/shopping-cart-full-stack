import { requestAjax } from "@/services/core/http";

export const getCarts = async ({ id }: { id: number }) => {
  const response = await requestAjax("/carts", {
    method: "get",
    pathParams: { id },
  });
  return response.data;
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
  const response = await requestAjax("/carts/products", {
    method: "patch",
    pathParams: { cartId, productId },
    data: { quantity },
  });
  return response.data;
};

export const deleteCartsProducts = async ({
  cartId,
  productId,
}: {
  cartId: number;
  productId: number;
}) => {
  const response = await requestAjax("/carts/products", {
    method: "delete",
    pathParams: { cartId, productId },
  });
  return response.data;
};
