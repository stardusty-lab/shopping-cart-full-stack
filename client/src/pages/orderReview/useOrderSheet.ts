import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import { useLoadData } from "@/services/core/useLoadData";

import { getOrderSheet } from "@/services/apis/orderSheets/repository";

export const useOrderSheet = () => {
  const { id } = useParams<{ id: string }>();

  const loadData = useLoadData({
    queryFn: useCallback(async () => {
      if (!id) return;

      return await getOrderSheet({ id: Number(id) });
    }, [id]),
  });

  const { status, data } = loadData.status;

  const totalCount = data?.products.reduce((acc, product) => {
    acc += product.quantity;
    return acc;
  }, 0);

  const updateIsRemoteArea = ({ isRemoteArea }: { isRemoteArea: boolean }) => {
    // setIsRemoteArea(isRemoteArea);
  };

  const updateCouponSelection = ({
    couponSelection,
  }: {
    couponSelection: number[];
  }) => {
    // setCouponSelection(couponSelection);
  };

  const [pricing] = useState({
    orderSheetAmount: 0,
    discountAmount: 0,
    shippingFee: 0,
  });

  const paymentAmount =
    pricing.orderSheetAmount - pricing.discountAmount + pricing.shippingFee;

  return {
    status,

    products: data?.products,
    totalCount,

    isRemoteArea: data?.isRemoteArea,
    updateIsRemoteArea,

    couponSelection: data?.selectedCoupons,
    updateCouponSelection,

    pricing,
    paymentAmount,
  };
};
