import { useEffect, useCallback } from "react";
import type { ReactNode } from "react";

import { useLoadData } from "@/services/core/useLoadData";

import { getCarts } from "@/services/apis/carts/repository";
import type { GetCarts } from "@/services/apis/carts/repository.types";

import { applyErrorPolicy, LOAD_ERROR_POLICY } from "../errorPolicy";
import type { CartProduct } from "../useCarts";

import { MISSION_CART_ID } from "../constants";

export interface LoadActionOptions {
  updateCartProducts: (params: CartProduct[]) => void;
}

export const useCartsLoadAction = ({
  updateCartProducts,
}: LoadActionOptions) => {
  const {
    status: { status, data, error },
  } = useLoadData<Awaited<ReturnType<GetCarts>>>({
    queryFn: useCallback(async () => {
      return await getCarts({ cartId: MISSION_CART_ID });
    }, []),
  });

  const policy =
    LOAD_ERROR_POLICY[
      (error as { errorCode: string })
        ?.errorCode as keyof typeof LOAD_ERROR_POLICY
    ];

  const errorMessage = applyErrorPolicy(policy, {
    field: (policy: { message: ReactNode }) => policy.message,
  });

  useEffect(() => {
    if (!data?.products) return;

    updateCartProducts(data.products);
  }, [data]);

  return {
    data,
    status,
    errorMessage,
  };
};
