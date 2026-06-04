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

  return { cartProducts };
};
