import { OrderSheet } from "./orderSheets.model.ts";
import { orderSheetStore } from "../../raw/raw.orderSheet.ts";

export const findById = (orderSheetId: number) => {
  const orderSheet = orderSheetStore.orderSheets.find((orderSheet) => {
    return orderSheet.id === orderSheetId;
  });

  if (!orderSheet) return;

  return new OrderSheet({
    id: orderSheet.id,
    products: orderSheet.products,
    isRemoteShippingArea: orderSheet.remoteArea,
    selectedCoupons: orderSheet.coupons,
  });
};
