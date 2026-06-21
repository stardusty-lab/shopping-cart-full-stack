import { useState } from "react";

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
  const [coupons] = useState([
    {
      id: 1,
      code: "FIXED5000",
      name: "5,000원 할인 쿠폰",
      expirationDate: "2026-11-30",
      minOrderAmount: 100000,
    },
    {
      id: 2,
      code: "BOGO",
      name: "2개 구매 시 1개 무료 쿠폰",
      expirationDate: "2026-06-30",
    },
    {
      id: 3,
      code: "FREESHIPPING",
      name: "5만원 이상 구매 시 무료 배송 쿠폰",
      expirationDate: "2026-08-31",
      minOrderAmount: 50000,
    },
    {
      id: 4,
      code: "MIRACLESALE",
      name: "미라클모닝 30% 할인 쿠폰",
      expirationDate: "2026-07-31",
      validTime: {
        start: "04:00",
        end: "07:00",
      },
    },
  ]);

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

  const couponViewModels = coupons.map((coupon) => {
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
