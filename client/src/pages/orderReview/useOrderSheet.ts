import { useState } from "react";

export const useOrderSheet = () => {
  const [products] = useState([
    {
      id: 1,
      quantity: 1,
      price: 18000,
      name: "Shopping Basket",
      imgUrl: "https://example.com/images/shopping-basket.png",
    },
    {
      id: 3,
      quantity: 2,
      price: 9900,
      name: "Reusable Cup",
      imgUrl: "https://example.com/images/reusable-cup.png",
    },
  ]);

  const totalCount = products.reduce((acc, product) => {
    acc += product.quantity;
    return acc;
  }, 0);

  const [isRemoteArea, setIsRemoteArea] = useState(false);
  const updateIsRemoteArea = ({ isRemoteArea }: { isRemoteArea: boolean }) => {
    setIsRemoteArea(isRemoteArea);
  };

  const [couponSelection, setCouponSelection] = useState<number[]>([]);
  const updateCouponSelection = ({
    couponSelection,
  }: {
    couponSelection: number[];
  }) => {
    setCouponSelection(couponSelection);
  };

  const [pricing] = useState({
    orderSheetAmount: 0,
    discountAmount: 0,
    shippingFee: 0,
  });

  const paymentAmount =
    pricing.orderSheetAmount - pricing.discountAmount + pricing.shippingFee;

  return {
    products,
    totalCount,

    isRemoteArea,
    updateIsRemoteArea,

    couponSelection,
    updateCouponSelection,

    pricing,
    paymentAmount,
  };
};
