import { useEffect, useState } from "react";

import { cartsProducts } from "@/mocks/data/carts";

import { validateUpdateProductQuauntity } from "./validate";

interface CartProduct {
  id: number;
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
}

interface UpdateProductQuauntityCommand {
  id: number;
  quantity: number;
}

export const useCarts = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    setCartProducts(cartsProducts);
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

  const deleteProduct = ({ id: productId }: { id: number }) => {
    const filteredCartProducts = cartProducts.filter((product) => {
      return product.id !== productId;
    });

    setCartProducts(filteredCartProducts);
  };

  return { cartProducts, updateProductQuauntity, deleteProduct };
};
