import { Layout } from "@/core/components/Layout";
import { Header } from "@/core/components/Header";
import { Button } from "@/core/components/Button";
import { Notice } from "@/core/components/Notice";

export const OrderReview = () => {
  return (
    <Layout>
      <Header leading={<Header.Back onClick={() => {}} />} />
      <Notice>
        <p>주문</p>
        <p>
          총 2종류의 상품 4개를 주문합니다. <br />
          최종 결제 금액을 확인해 주세요.
        </p>
        <p>총 결제 금액</p>
        <p>120000원</p>
      </Notice>
      <Button variant="primary" size="large" block disabled>
        결제하기
      </Button>
    </Layout>
  );
};
