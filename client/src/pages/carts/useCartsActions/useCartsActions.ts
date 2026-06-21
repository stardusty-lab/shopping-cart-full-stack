import { postOrderSheet } from "@/services/apis/orderSheets/repository";

import { useCarts } from "../useCarts";

import { useCartsDeleteAction } from "./useCartsDeleteAction";
import { useCartsLoadAction } from "./useCartsLoadAction";
import { useCartsUpdateQuantityAction } from "./useCartsUpdateQuantityAction";

export const useCartsActions = () => {
  const {
    cartProducts,
    selectionProducts,
    updateCartProducts,
    updateProductQuantity,
    deleteProduct,
    updateProductSelection,
    updateAllProductSelection,
  } = useCarts();

  const loadAction = useCartsLoadAction({ updateCartProducts });

  const updateQuantityAction = useCartsUpdateQuantityAction({
    updateProductQuantity,
  });

  const deleteAction = useCartsDeleteAction({ deleteProduct });

  const submit = async () => {
    const res = await postOrderSheet({ productIds: selectionProducts });
    return res.id;
  };

  return {
    loadCartsProductsStatus: loadAction.status,
    loadProductQuantityErrorMessage: loadAction.errorMessage,

    cartProducts,

    updateProductQuantityErrorMessage: updateQuantityAction.errorMessage,
    updateProductQuantity: updateQuantityAction.updateProductQuantity,

    openAlert: updateQuantityAction.openAlert,
    onAlertClose: updateQuantityAction.onAlertClose,

    deleteProduct: deleteAction.deleteProduct,

    updateProductSelection,
    updateAllProductSelection,

    submit,
  };
};
