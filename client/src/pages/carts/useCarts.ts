import { useState } from "react";

import { validateUpdateProductQuantity } from "./validate";

export interface CartProduct {
  id: number;
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
}

export interface UpdateProductQuantityCommand {
  id: number;
  quantity: number;
}

export interface DeleteProductParams {
  id: number;
}

export interface SelectionProduct {
  id: number;
  selected: boolean;
}

export const useCarts = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const [selectionProducts, setSelectionProducts] = useState<
    SelectionProduct[]
  >([]);

  const updateCartProducts = (products: CartProduct[]) => {
    setCartProducts(products);
    setSelectionProducts(
      products.map((product: CartProduct) => {
        return { id: product.id, selected: true };
      }),
    );
  };

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

    const filteredSelectionProducts = selectionProducts.filter(
      (selectionProduct) => {
        return selectionProduct.id !== productId;
      },
    );
    setSelectionProducts(filteredSelectionProducts);
  };

  const updateProductSelection = ({
    id: productId,
    selected,
  }: {
    id: number;
    selected: boolean;
  }) => {
    const changedSelectionProducts = selectionProducts.map(
      (selectionProduct) => {
        return selectionProduct.id !== productId
          ? selectionProduct
          : { ...selectionProduct, selected };
      },
    );

    setSelectionProducts(changedSelectionProducts);
  };

  const updateAllProductSelection = ({ selected }: { selected: boolean }) => {
    const changedSelectionProducts = selectionProducts.map((product) => {
      return { ...product, selected };
    });

    setSelectionProducts(changedSelectionProducts);
  };

  const cartProductsWithSelection = cartProducts.map((cartProduct) => {
    const selectionProduct = selectionProducts.find(
      (selectionProduct) => selectionProduct.id === cartProduct.id,
    );

    return { ...cartProduct, selected: selectionProduct?.selected };
  });

  return {
    cartProducts: cartProductsWithSelection,
    updateCartProducts,
    updateProductQuantity,
    deleteProduct,
    updateProductSelection,
    updateAllProductSelection,
  };
};
