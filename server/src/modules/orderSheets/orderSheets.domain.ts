export const calculateOrderSheetAmount = (
  products: { price: number; quantity: number }[],
): number => {
  return products.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);
};
