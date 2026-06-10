import { useExecute } from "@/services/core/useExecute";

import { deleteCartsProducts } from "@/services/apis/carts/repository";

import type { DeleteProductParams } from "../useCarts";

const CART_ID = 1;

export interface DeleteActionOptions {
  deleteProduct: (params: DeleteProductParams) => void;
}

export const useCartsDeleteAction = ({
  deleteProduct,
}: DeleteActionOptions) => {
  const { mutate: deleteCartsProductsMutate } = useExecute({
    executeFn: deleteCartsProducts,
  });

  const executeDeleteProduct = async ({
    id: productId,
  }: DeleteProductParams) => {
    await deleteCartsProductsMutate({
      cartId: CART_ID,
      productId,
    });

    deleteProduct({
      id: productId,
    });
  };

  return {
    deleteProduct: executeDeleteProduct,
  };
};
