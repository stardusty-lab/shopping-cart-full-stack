import { useEffect, useState } from "react";

import { cartsProducts } from "@/mocks/data/carts";

interface CartProduct {
  id: number;
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
}

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
    const changedCartProducts = cartProducts.map((product) => {
      return product.id !== productId ? product : { ...product, quantity };
    });

    setCartProducts(changedCartProducts);
  };

  return { cartProducts, updateProductQuauntity };
};
