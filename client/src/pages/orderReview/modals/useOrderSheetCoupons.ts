import { useState } from "react";

import { useLoadData } from "@/services/core/useLoadData";

import { getCoupons } from "@/services/apis/coupons/repository";

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

  const [ableCoupons] = useState([1, 2]);

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
    const isAble = ableCoupons.includes(coupon.id);
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
