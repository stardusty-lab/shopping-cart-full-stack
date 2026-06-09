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
  UpdateProductQuantityCommand,
  DeleteProductParams,
} from "./useCarts";

import { validateUpdateProductQuantity } from "./validate";
import { RequestAjaxError } from "@/services/core/http/error";

const ERROR_POLICY = {
  MISSING_FIELD: { type: "ignore" },
  INVALID: { type: "ignore" },
  RESOURCE_NOT_FOUND: { type: "ignore" },
  TYPE_MISMATCH: {
    type: "alert",
    message: "잘못된 형식의 요청입니다. 입력값을 확인해주세요.",
  },
  NO_JSON: { type: "alert", message: "잘못된 요청입니다. 다시 시도해주세요." },
  ROUTE_NOT_FOUND: {
    type: "alert",
    message: "요청한 기능을 찾을 수 없습니다. 잠시 후 다시 시도해주세요.",
  },
} as const;

const CART_ID = 1;

export const useCartsActions = () => {
  const {
    cartProducts,
    setCartProducts,
    updateProductQuantity,
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

  const { open, message, onOpen, onClose } = useAlert();

  const executeErrorPolicy = (
    policy: (typeof ERROR_POLICY)[keyof typeof ERROR_POLICY],
  ) => {
    if (!policy) return;

    switch (policy.type) {
      case "ignore":
        return;

      case "alert":
        onOpen(policy.message);
        return;
    }
  };

  const { mutate: patchCartsProductsMutate } = useExecute({
    executeFn: patchCartsProducts,
    onError: (error: unknown) => {
      if (error instanceof RequestAjaxError) {
        const { errorCode } = error.data as { errorCode: string };

        const policy = ERROR_POLICY[errorCode as keyof typeof ERROR_POLICY];

        executeErrorPolicy(policy);
      }
    },
  });

  const executeUpdateProductQuantity = async ({
    id: productId,
    quantity,
  }: UpdateProductQuantityCommand) => {
    // 서버에 유효하지 않은 수량 변경 요청을 보내지 않기 위한 방어 코드
    if (!validateUpdateProductQuantity(quantity)) return false;

    try {
      await patchCartsProductsMutate({
        cartId: CART_ID,
        productId,
        quantity,
      });

      updateProductQuantity({
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
    updateProductQuantity: executeUpdateProductQuantity,
    deleteProduct: executeDeleteProduct,
    updateProductSelection,
    updateAllProductSelection,

    updateProductQuantityErrorMessage: message,
    openAlert: open,
    onAlertClose: onClose,
  };
};
