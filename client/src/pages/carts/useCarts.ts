import { useEffect, useState } from "react";

import { getCarts } from "@/services/apis/carts/repository";

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

  const fetchGetCarts = async () => {
    const { products } = await getCarts({ cartId: CART_ID });
    setCartProducts(
      products.map((product) => ({ ...product, selected: true })),
    );
  };

  useEffect(() => {
    fetchGetCarts();
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
