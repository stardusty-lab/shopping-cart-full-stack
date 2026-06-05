import { useEffect, useCallback } from "react";

import { useAlert } from "@/core/components/Alert";

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
import { RequestAjaxError } from "@/services/core/http/error";

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

  const { open, onOpen, onClose } = useAlert();

  const {
    status: { error: patchCartsProductsError },
    mutate: patchCartsProductsMutate,
  } = useExecute({
    executeFn: patchCartsProducts,
    onError: (error: unknown) => {
      if (error instanceof RequestAjaxError) {
        const { errorCode } = error.data as { errorCode: string };

        if (errorCode === "MISSING_FIELD") {
          return;
        }

        if (errorCode === "INVALID") {
          return;
        }

        if (errorCode === "RESOURCE_NOT_FOUND") {
          return;
        }

        if (
          errorCode === "TYPE_MISMATCH" ||
          errorCode === "NO_JSON" ||
          errorCode === "ROUTE_NOT_FOUND"
        ) {
          onOpen();
          return;
        }
      }
    },
  });

  const executeUpdateProductQuauntity = async ({
    id: productId,
    quantity,
  }: UpdateProductQuauntityCommand) => {
    if (!validateUpdateProductQuauntity(quantity)) return false;

    try {
      await patchCartsProductsMutate({
        cartId: CART_ID,
        productId,
        quantity,
      });

      updateProductQuauntity({
        id: productId,
        quantity,
      });
    } catch (error) {
      console.log(error);
    }
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
    updateProductQuauntityError: patchCartsProductsError,
    updateProductQuauntity: executeUpdateProductQuauntity,
    deleteProduct: executeDeleteProduct,
    updateProductSelection,
    updateAllProductSelection,

    openAlert: open,
    onAlertClose: onClose,
  };
};
