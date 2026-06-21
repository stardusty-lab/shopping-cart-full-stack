import { useCallback } from "react";
import { useParams } from "react-router-dom";

import { useExecute } from "@/services/core/useExecute";

import {
  patchOrderSheetShippingArea,
  patchOrderSheetCoupons,
} from "@/services/apis/orderSheets/repository";

import { useOrderSheetData } from "./useOrderSheetData";
import { useOrderSheetPricing } from "./useOrderSheetPricing";

export const useOrderSheet = () => {
  const { id } = useParams<{ id: string }>();

  const orderSheetLoadData = useOrderSheetData();
  const { products, totalCount, isRemoteArea, couponSelection } =
    orderSheetLoadData;

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
    onSuccess: () => {
      orderSheetLoadData.refetch();
      pricingLoadData.refetch();
    },
  });

  const updateIsRemoteArea = async ({
    isRemoteArea,
  }: {
    isRemoteArea: boolean;
  }) => {
    await updateIsRemoteAreaMutate(isRemoteArea);
  };

  const { mutate: updateSelectedCouponsMutate } = useExecute({
    executeFn: useCallback(
      async (selectedCoupons: number[]) => {
        return await patchOrderSheetCoupons({
          id: Number(id),
          selectedCoupons,
        });
      },
      [id],
    ),
    onSuccess: () => {
      orderSheetLoadData.refetch();
      pricingLoadData.refetch();
    },
  });

  const updateCouponSelection = async ({
    couponSelection,
  }: {
    couponSelection: number[];
  }) => {
    await updateSelectedCouponsMutate(couponSelection);
  };

  const pricingLoadData = useOrderSheetPricing();
  const { pricing, paymentAmount } = pricingLoadData;

  return {
    products,
    totalCount,

    isRemoteArea,

    couponSelection,

    pricing,
    paymentAmount,

    updateIsRemoteArea,
    updateCouponSelection,
  };
};
