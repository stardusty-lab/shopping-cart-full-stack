import type { ReactNode } from "react";

import { useAlert } from "@/core/components/Alert";

import { useExecute } from "@/services/core/useExecute";

import { patchCartsProducts } from "@/services/apis/carts/repository";

import type { UpdateProductQuantityCommand } from "../useCarts";

import { validateUpdateProductQuantity } from "../validate";

import { applyErrorPolicy, UPDATE_QUANTITY_ERROR_POLICY } from "../errorPolicy";

import { RequestAjaxError } from "@/services/core/http/error";

import { MISSION_CART_ID } from "../constants";

export interface UpdateQuantityActionOptions {
  updateProductQuantity: (command: UpdateProductQuantityCommand) => void;
}

export const useCartsUpdateQuantityAction = ({
  updateProductQuantity,
}: UpdateQuantityActionOptions) => {
  const { open, message, onOpen, onClose } = useAlert();

  const { mutate: patchCartsProductsMutate } = useExecute({
    executeFn: patchCartsProducts,
    onError: (error: unknown) => {
      if (error instanceof RequestAjaxError) {
        const { errorCode } = error.data as { errorCode: string };

        const policy =
          UPDATE_QUANTITY_ERROR_POLICY[
            errorCode as keyof typeof UPDATE_QUANTITY_ERROR_POLICY
          ];

        applyErrorPolicy(policy, {
          alert: (policy: { message: ReactNode }) => onOpen(policy.message),
        });
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
        cartId: MISSION_CART_ID,
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

  return {
    errorMessage: message,

    updateProductQuantity: executeUpdateProductQuantity,

    openAlert: open,
    onAlertClose: onClose,
  };
};
