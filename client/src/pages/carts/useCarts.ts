import { useEffect, useState, useCallback } from "react";

import { useLoadData } from "@/services/core/useLoadData";

import { getCarts } from "@/services/apis/carts/repository";
import type { GetCarts } from "@/services/apis/carts/repository.types";

import { validateUpdateProductQuauntity } from "./validate";

interface CartProduct {
  id: number;
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
  selected: boolean;
}

interface UpdateProductQuauntityCommand {
  id: number;
  quantity: number;
}

interface DeleteProductParams {
  id: number;
}

const CART_ID = 1;

export const useCarts = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const {
    status: { data },
  } = useLoadData<Awaited<ReturnType<GetCarts>>>({
    queryFn: useCallback(async () => {
      return await getCarts({ cartId: CART_ID });
    }, []),
  });

  useEffect(() => {
    if (!data?.data?.products) return;

    setCartProducts(
      data?.data?.products.map(
        (product: Awaited<ReturnType<GetCarts>>["products"][number]) => ({
          ...product,
          selected: true,
        }),
      ),
    );
  }, [data]);

  const updateProductQuauntity = ({
    id: productId,
    quantity,
  }: UpdateProductQuauntityCommand) => {
    if (!validateUpdateProductQuauntity(quantity)) return false;

    const changedCartProducts = cartProducts.map((product) => {
      return product.id !== productId ? product : { ...product, quantity };
    });

    setCartProducts(changedCartProducts);
  };

  const deleteProduct = ({ id: productId }: DeleteProductParams) => {
    const filteredCartProducts = cartProducts.filter((product) => {
      return product.id !== productId;
    });

    setCartProducts(filteredCartProducts);
  };

  const updateProductSelection = ({
    id: productId,
    selected,
  }: {
    id: number;
    selected: boolean;
  }) => {
    const changedCartProducts = cartProducts.map((product) => {
      return product.id !== productId ? product : { ...product, selected };
    });

    setCartProducts(changedCartProducts);
  };

  const updateAllProductSelection = ({ selected }: { selected: boolean }) => {
    const changedCartProducts = cartProducts.map((product) => {
      return { ...product, selected };
    });

    setCartProducts(changedCartProducts);
  };

  return {
    cartProducts,
    updateProductQuauntity,
    deleteProduct,
    updateProductSelection,
    updateAllProductSelection,
  };
};
