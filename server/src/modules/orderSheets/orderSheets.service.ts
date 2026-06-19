import type {
  OrderSheetResponse,
  CreateOrderSheetResponse,
} from "./orderSheets.dto.ts";
import * as orderSheetStore from "./orderSheets.repository.ts";
import * as productsStore from "../products/products.repository.ts";

export const getOrderSheetById = (orderSheetId: number): OrderSheetResponse => {
  const orderSheet = orderSheetStore.findById(orderSheetId);
  if (!orderSheet) throw new Error();

  return {
    orderSheet: {
      items: orderSheet.products.map((product) => {
        const productData = productsStore.findById(product.id);
        if (!productData) throw new Error();

        return {
          product: {
            id: product.id,
            name: productData.name,
            price: productData.price,
            imgUrl: productData.imgUrl,
          },
          quantity: product.quantity,
        };
      }),
      isRemoteShippingArea: orderSheet.isRemoteShippingArea,
      selectedCoupons: orderSheet.selectedCoupons,
    },
  };
};

export const createOrderSheet = (
  products: { id: number; quantity: number }[],
): CreateOrderSheetResponse => {
  const selectedCoupons: number[] = [];
  const orderSheet = {
    products,
    remoteArea: false,
    coupons: selectedCoupons,
  };

  const newOrderSheet = orderSheetStore.create(orderSheet);
  return newOrderSheet;
};
