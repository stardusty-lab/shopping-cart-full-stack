import { useLocation, useNavigate } from "react-router-dom";

import { Layout } from "@/core/components/Layout";
import { Header } from "@/core/components/Header";
import { Button } from "@/core/components/Button";
import { Notice } from "@/core/components/Notice";

import type { OrderReviewState } from "./OrderReview.types";

export const OrderReview = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as OrderReviewState;

  if (!state) return null;

  const { products, paymentAmount } = state;

  const totalCount = products.reduce((acc, product) => {
    acc += product;
    return acc;
  }, 0);

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Header leading={<Header.Back onClick={handleClickBack} />} />
      <Notice>
        <p>주문</p>
        <p>
          총 {products.length}종류의 상품 {totalCount}개를 주문합니다. <br />
          최종 결제 금액을 확인해 주세요.
        </p>
        <p>최종 결제 금액을 확인해 주세요.</p>
        <p>총 결제 금액</p>
        <p>{paymentAmount}원</p>
      </Notice>
      <Button variant="primary" size="large" block disabled>
        결제하기
      </Button>
    </Layout>
  );
};
