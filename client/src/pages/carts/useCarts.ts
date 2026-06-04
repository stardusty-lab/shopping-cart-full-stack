import { useEffect, useState } from "react";

import { cartsProducts } from "@/mocks/data/carts";

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

export const useCarts = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    setCartProducts(
      cartsProducts.map((product) => ({ ...product, checked: true })),
    );
  }, []);

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

  const updateProductsSelection = ({ selected }: { selected: boolean }) => {
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
    updateProductsSelection,
  };
};
