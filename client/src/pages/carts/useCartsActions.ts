import { useEffect, useCallback } from "react";

import { useLoadData } from "@/services/core/useLoadData";

import { getCarts } from "@/services/apis/carts/repository";
import type { GetCarts } from "@/services/apis/carts/repository.types";

import { useCarts } from "./useCarts";

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
    status: { data },
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

  return {
    cartProducts,
    updateProductQuauntity,
    deleteProduct,
    updateProductSelection,
    updateAllProductSelection,
  };
};
