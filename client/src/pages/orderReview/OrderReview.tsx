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

import { Modal } from "@/core/components/Modal";

export const OrderReview = () => {
  const navigate = useNavigate();

  const { products, paymentAmount } = { products: [], paymentAmount: 0 };

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
          <List.Item>
            <List.Item.Left>
              <ImgBox img="" />
            </List.Item.Left>
            <List.Item.Box
              title="상품이름A"
              content="35000원"
              description="2개"
            />
          </List.Item>
          <List.Item>
            <List.Item.Left>
              <ImgBox img="" />
            </List.Item.Left>
            <List.Item.Box
              title="상품이름A"
              content="35000원"
              description="2개"
            />
          </List.Item>
        </List>

        <Button variant="secondary" size="medium" edge="rounded" block>
          쿠폰 적용
        </Button>

        <Title title={"배송 정보"} level={2} />

        <Checkbox label="제주도 및 도서 산간 지역" />

        <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>

        <DataInfo>
          <DataInfo.Item title="주문 금액" content="70,000원" />
          <DataInfo.Item title="쿠폰 할인 금액" content="6,000원" />
          <DataInfo.Item title="배송비" content="6,000원" />
          <DataInfo.Item title="총 결제 금액" content={`${paymentAmount}원`} />
        </DataInfo>
      </ContentBox>

      <Button variant="primary" size="large" block>
        결제하기
      </Button>

      {false && (
        <Modal>
          <Modal.Header>쿠폰을 선택해 주세요</Modal.Header>
          <p>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>

          <List>
            <List.Item>
              <List.Item.Box
                title={<Checkbox label="5,000원 할인 쿠폰" />}
                description={
                  <>
                    만료일: 2024년 11월 30일 <br />
                    최소 주문 금액: 100,000원
                  </>
                }
              ></List.Item.Box>
            </List.Item>
            <List.Item>
              <List.Item.Box>
                <Checkbox label="2개 구매 시 1개 무료 쿠폰" />
                만료일: 2024년 11월 30일
              </List.Item.Box>
            </List.Item>
            <List.Item>
              <List.Item.Box>
                <Checkbox label="5만원 이상 구매 시 무료 배송 쿠폰" />
                만료일: 2024년 8월 31일
                <br />
                최소 주문 금액: 50,000원
              </List.Item.Box>
            </List.Item>
            <List.Item>
              <List.Item.Box>
                <Checkbox label="미라클모닝 30% 할인 쿠폰" />
                만료일: 2024년 7월 31일 <br />
                사용 가능 시간: 오전 4시부터 7시까지
              </List.Item.Box>
            </List.Item>
          </List>

          <Button variant="primary" size="medium" block>
            총 6,000원 할인 쿠폰 사용하기
          </Button>
        </Modal>
      )}
    </Layout>
  );
};
