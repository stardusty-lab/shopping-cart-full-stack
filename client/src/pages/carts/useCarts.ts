import { useState } from "react";

import { validateUpdateProductQuantity } from "./validate";

export interface CartProduct {
  id: number;
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
  selected: boolean;
}

export interface UpdateProductQuantityCommand {
  id: number;
  quantity: number;
}

export interface DeleteProductParams {
  id: number;
}

export const useCarts = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const updateProductQuantity = ({
    id: productId,
    quantity,
  }: UpdateProductQuantityCommand) => {
    // 장바구니 상태(SSOT)에 유효하지 않은 수량이 저장되지 않도록 방어
    if (!validateUpdateProductQuantity(quantity)) return false;

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
    setCartProducts,
    updateProductQuantity,
    deleteProduct,
    updateProductSelection,
    updateAllProductSelection,
  };
};
