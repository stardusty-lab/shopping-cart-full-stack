export const validateUpdateProductQuauntity = (quantity: number) => {
  if (quantity < 1) return false;
  if (quantity > 99) return false;

  return true;
};
