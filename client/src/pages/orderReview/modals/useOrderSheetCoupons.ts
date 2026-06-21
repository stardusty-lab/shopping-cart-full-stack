import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import { useLoadData } from "@/services/core/useLoadData";

import { getCoupons } from "@/services/apis/coupons/repository";
import { getOrderSheetAbleCoupons } from "@/services/apis/orderSheets/repository";

interface Props {
  couponSelection: number[];
  updateCouponSelection: ({
    couponSelection,
  }: {
    couponSelection: number[];
  }) => void;
}

export const useOrderSheetCoupons = ({
  couponSelection,
  updateCouponSelection: updateCouponSelectionActions,
}: Props) => {
  const couponsLoadData = useLoadData({
    queryFn: getCoupons,
  });

  const coupons = couponsLoadData.status.data?.coupons;

  const { id } = useParams<{ id: string }>();

  const ableCouponsLoadData = useLoadData({
    queryFn: useCallback(async () => {
      return await getOrderSheetAbleCoupons({ id: Number(id) });
    }, [id]),
  });

  const ableCoupons = ableCouponsLoadData.status.data?.ableCoupons;

  const [draftCouponSelection, setDraftCouponSelection] =
    useState(couponSelection);
  const changeCouponSelection = ({
    id,
    checked,
  }: {
    id: number;
    checked: boolean;
  }) => {
    const newDraftCouponSelection: number[] = checked
      ? [...draftCouponSelection, id]
      : draftCouponSelection.filter((couponId) => couponId !== id);
    setDraftCouponSelection(newDraftCouponSelection);
  };

  const couponViewModels = coupons?.map((coupon) => {
    const isAble = ableCoupons?.includes(coupon.code);
    const isSelected = draftCouponSelection.includes(coupon.id);

    return { ...coupon, isAble, isSelected };
  });

  const updateCouponSelection = async () => {
    await updateCouponSelectionActions({
      couponSelection: draftCouponSelection,
    });
  };

  return {
    coupons: couponViewModels,
    changeCouponSelection,
    updateCouponSelection,
  };
};
