import { useEffect, useState } from "react";

import { cartsProducts } from "@/mocks/data/carts";

interface CartProduct {
  id: number;
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
}

const validateUpdateProductQuauntity = (quantity: number) => {
  if (quantity < 1) return false;
  if (quantity > 99) return false;

  return true;
};

export const useCarts = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    setCartProducts(cartsProducts);
  }, []);

  const updateProductQuauntity = ({
    id: productId,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    if (!validateUpdateProductQuauntity(quantity)) return false;

    const changedCartProducts = cartProducts.map((product) => {
      return product.id !== productId ? product : { ...product, quantity };
    });

    setCartProducts(changedCartProducts);
  };

  return { cartProducts, updateProductQuauntity };
};
