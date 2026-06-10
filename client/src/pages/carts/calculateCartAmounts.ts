import { DELIVERY_FEE, FREE_DELIVERY_FEE_THRESHOLD } from "./constants";

import type { CartProduct } from "./useCarts";

export const calculateCartAmounts = (cartProducts: CartProduct[]) => {
  if (!cartProducts.length) {
    return { cartAmount: 0, deliveryFee: 0, paymentAmount: 0 };
  }
  const cartAmount = cartProducts.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);
  const deliveryFee =
    cartAmount >= FREE_DELIVERY_FEE_THRESHOLD ? 0 : DELIVERY_FEE;
  const paymentAmount = cartAmount + deliveryFee;
  return { cartAmount, deliveryFee, paymentAmount };
};
