import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Layout } from "@/core/components/Layout";
import { Header } from "@/core/components/Header";
import { Button } from "@/core/components/Button";
import { Title } from "@/core/components/Title";
import { List } from "@/core/components/List";
import { ImgBox } from "@/core/components/ImgBox";
import { DataInfo } from "@/core/components/DataInfo";
import { Checkbox } from "@/core/components/Checkbox";
import { ContentBox } from "@/core/components/ContentBox";

import { formatNumber } from "@/core/utils/format";

export const OrderReview = () => {
  const navigate = useNavigate();

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

  const [isRemoteArea] = useState(false);

  const [pricing] = useState({
    orderSheetAmount: 0,
    discountAmount: 0,
    shippingFee: 0,
  });

  const paymentAmount =
    pricing.orderSheetAmount - pricing.discountAmount + pricing.shippingFee;

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Header leading={<Header.Back onClick={handleClickBack} />} />

      <ContentBox>
        <Title
          title={"주문 확인"}
          subTitle={
            <>
              총 {products.length}종류의 상품 {totalCount}개를 주문합니다.{" "}
              <br />
              최종 결제 금액을 확인해 주세요.
            </>
          }
        />

        <List>
          {products.map((product) => {
            return (
              <List.Item>
                <List.Item.Left>
                  <ImgBox img={product.imgUrl} />
                </List.Item.Left>
                <List.Item.Box
                  title={product.name}
                  content={`${formatNumber(product.price)}원`}
                  description={`${product.quantity}개`}
                />
              </List.Item>
            );
          })}
        </List>

        <Button variant="secondary" size="medium" edge="rounded" block>
          쿠폰 적용
        </Button>

        <Title title={"배송 정보"} level={2} />

        <Checkbox label="제주도 및 도서 산간 지역" value={isRemoteArea} />

        <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>

        <DataInfo>
          <DataInfo.Item
            title="주문 금액"
            content={`${pricing.orderSheetAmount}원`}
          />
          <DataInfo.Item
            title="쿠폰 할인 금액"
            content={`${pricing.discountAmount}원`}
          />
          <DataInfo.Item title="배송비" content={`${pricing.shippingFee}원`} />
          <DataInfo.Item title="총 결제 금액" content={`${paymentAmount}원`} />
        </DataInfo>
      </ContentBox>

      <Button variant="primary" size="large" block>
        결제하기
      </Button>
    </Layout>
  );
};
