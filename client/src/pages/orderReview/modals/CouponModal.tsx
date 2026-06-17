import { useState } from "react";

import { Modal } from "@/core/components/Modal";
import { Button } from "@/core/components/Button";
import { List } from "@/core/components/List";
import { Checkbox } from "@/core/components/Checkbox";

export const CouponModal = () => {
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

  const [couponSelection, setCouponSelection] = useState([1, 2]);
  const updateCouponSelection = ({
    couponSelection,
  }: {
    couponSelection: number[];
  }) => {
    setCouponSelection(couponSelection);
  };

  const couponViewModels = coupons.map((coupon) => {
    const isAble = ableCoupons.includes(coupon.id);
    const isSelected = couponSelection.includes(coupon.id);

    return { ...coupon, isAble, isSelected };
  });

  return (
    <Modal>
      <Modal.Header>쿠폰을 선택해 주세요</Modal.Header>
      <p>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>

      <List>
        {couponViewModels.map((coupon) => {
          return (
            <List.Item>
              <List.Item.Box
                style={{
                  ...(!coupon.isAble && {
                    opacity: 0.5,
                    pointerEvents: "none",
                  }),
                }}
                title={
                  <Checkbox
                    id={coupon.id}
                    label={coupon.name}
                    checked={coupon.isSelected}
                  />
                }
                description={
                  <>
                    {coupon.expirationDate && (
                      <>만료일: {coupon.expirationDate}</>
                    )}
                    {coupon.minOrderAmount && (
                      <>
                        <br /> 최소 주문 금액: {coupon.minOrderAmount}원
                      </>
                    )}
                    {coupon.validTime && (
                      <>
                        <br /> 사용 가능 시간: {coupon.validTime.start}부터
                        {coupon.validTime.end}까지
                      </>
                    )}
                  </>
                }
              ></List.Item.Box>
            </List.Item>
          );
        })}
      </List>

      <Button variant="primary" size="medium" block>
        총 6,000원 할인 쿠폰 사용하기
      </Button>
    </Modal>
  );
};
