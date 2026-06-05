import { useEffect, useCallback } from "react";

import { useLoadData } from "@/services/core/useLoadData";
import { useExecute } from "@/services/core/useExecute";

import {
  getCarts,
  patchCartsProducts,
  deleteCartsProducts,
} from "@/services/apis/carts/repository";
import type { GetCarts } from "@/services/apis/carts/repository.types";

import { useCarts } from "./useCarts";
import type {
  UpdateProductQuauntityCommand,
  DeleteProductParams,
} from "./useCarts";

import { validateUpdateProductQuauntity } from "./validate";

const CART_ID = 1;

export const useCartsActions = () => {
  const {
    cartProducts,
    setCartProducts,
    updateProductQuauntity,
    deleteProduct,
    updateProductSelection,
    updateAllProductSelection,
  } = useCarts();

  const {
    status: { status: loadCartsProductsStatus, data },
  } = useLoadData<Awaited<ReturnType<GetCarts>>>({
    queryFn: useCallback(async () => {
      return await getCarts({ cartId: CART_ID });
    }, []),
  });

  useEffect(() => {
    if (!data?.products) return;

    setCartProducts(
      data?.products.map(
        (product: Awaited<ReturnType<GetCarts>>["products"][number]) => ({
          ...product,
          selected: true,
        }),
      ),
    );
  }, [data]);

  const { mutate: patchCartsProductsMutate } = useExecute({
    executeFn: patchCartsProducts,
  });

  const executeUpdateProductQuauntity = async ({
    id: productId,
    quantity,
  }: UpdateProductQuauntityCommand) => {
    if (!validateUpdateProductQuauntity(quantity)) return false;

    await patchCartsProductsMutate({
      cartId: CART_ID,
      productId,
      quantity,
    });

    updateProductQuauntity({
      id: productId,
      quantity,
    });
  };

  const { mutate: deleteCartsProductsMutate } = useExecute({
    executeFn: deleteCartsProducts,
  });

  const executeDeleteProduct = async ({
    id: productId,
  }: DeleteProductParams) => {
    await deleteCartsProductsMutate({
      cartId: CART_ID,
      productId,
    });

    deleteProduct({
      id: productId,
    });
  };

  return {
    loadCartsProductsStatus,
    cartProducts,
    updateProductQuauntity: executeUpdateProductQuauntity,
    deleteProduct: executeDeleteProduct,
    updateProductSelection,
    updateAllProductSelection,
  };
};
