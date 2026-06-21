import { useCallback } from "react";
import { useParams } from "react-router-dom";

import { useLoadData } from "@/services/core/useLoadData";
import { useExecute } from "@/services/core/useExecute";

import {
  getOrderSheet,
  getOrderSheetPricing,
  patchOrderSheetShippingArea,
} from "@/services/apis/orderSheets/repository";

export const useOrderSheet = () => {
  const { id } = useParams<{ id: string }>();

  const orderSheetLoadData = useLoadData({
    queryFn: useCallback(async () => {
      if (!id) return;

      return await getOrderSheet({ id: Number(id) });
    }, [id]),
  });

  const { status: orderSheetStatus, data: orderSheetData } =
    orderSheetLoadData.status;

  const totalCount = orderSheetData?.products.reduce((acc, product) => {
    acc += product.quantity;
    return acc;
  }, 0);

  const { mutate: updateIsRemoteAreaMutate } = useExecute({
    executeFn: useCallback(
      async (isRemoteArea: boolean) => {
        return await patchOrderSheetShippingArea({
          id: Number(id),
          isRemoteArea,
        });
      },
      [id],
    ),
  });

  const updateIsRemoteArea = ({ isRemoteArea }: { isRemoteArea: boolean }) => {
    // setIsRemoteArea(isRemoteArea);
    updateIsRemoteAreaMutate(isRemoteArea);
  };

  const updateCouponSelection = ({
    couponSelection,
  }: {
    couponSelection: number[];
  }) => {
    // setCouponSelection(couponSelection);
  };

  const pricingLoadData = useLoadData({
    queryFn: useCallback(async () => {
      if (!id) return;

      return await getOrderSheetPricing({ id: Number(id) });
    }, [id]),
  });

  const { data: pricingData } = pricingLoadData.status;

  const paymentAmount = pricingData
    ? pricingData.orderSheetAmount -
      pricingData.discountAmount +
      pricingData.shippingFee
    : 0;

  return {
    status: orderSheetStatus,

    products: orderSheetData?.products,
    totalCount,

    isRemoteArea: orderSheetData?.isRemoteArea,
    updateIsRemoteArea,

    couponSelection: orderSheetData?.selectedCoupons,
    updateCouponSelection,

    pricing: pricingData,
    paymentAmount,
  };
};
