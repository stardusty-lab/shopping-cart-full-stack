import type { ChangeEvent } from "react";

import { Layout } from "@/core/components/Layout";
import { Header } from "@/core/components/Header";
import { Button } from "@/core/components/Button";
import { Checkbox } from "@/core/components/Checkbox";
import { List } from "@/core/components/List";
import { ImgBox } from "@/core/components/ImgBox";
import { Title } from "@/core/components/Title";
import { DataInfo } from "@/core/components/DataInfo";
import { NumberStepper } from "@/core/components/NumberStepper";
import { ContentBox } from "@/core/components/ContentBox";
import { Notice } from "@/core/components/Notice";

import { useCartsActions } from "./useCartsActions";

import { DEVERLY_FEE, FREE_DEVERLY_FEE_THRESHOLD } from "./constants";

export const Carts = () => {
  const {
    cartProducts,
    updateProductQuauntity,
    deleteProduct,
    updateProductSelection,
    updateAllProductSelection,
  } = useCartsActions();

  const handleChangeQuantity = ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    updateProductQuauntity({ id, quantity });
  };

  const handleClickDeleteProduct = ({ id }: { id: number }) => {
    deleteProduct({ id });
  };

  const isAllChecked = cartProducts.every((product) => product.selected);

  const handleAllToogleProductChecked = ({ checked }: { checked: boolean }) => {
    updateAllProductSelection({ selected: checked });
  };

  const handleToggleProductChecked = ({
    id,
    checked,
  }: {
    id: number;
    checked: boolean;
  }) => {
    updateProductSelection({ id, selected: checked });
  };

  const filteredCartProducts = cartProducts.filter(
    (product) => product.selected,
  );

  const cartAmount = filteredCartProducts.reduce((acc, selectedProduct) => {
    acc += selectedProduct.price * selectedProduct.quantity;
    return acc;
  }, 0);
  const delveryFee = cartAmount >= FREE_DEVERLY_FEE_THRESHOLD ? 0 : DEVERLY_FEE;
  const paymentAmount = cartAmount + delveryFee;

  return (
    <Layout>
      <Header title="SHOP" />
      <ContentBox>
        <Title
          title="장바구니"
          subTitle={`현재 ${cartProducts.length}종류의 상품이 담겨있습니다.`}
        />

        <Checkbox
          id="all"
          label="전체선택"
          checked={isAllChecked}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleAllToogleProductChecked({ checked: e.target.checked });
          }}
        />

        <hr />
        <List>
          {cartProducts.map((product) => {
            return (
              <List.Item
                headerLeft={
                  <Checkbox
                    id={String(product.id)}
                    name={String(product.id)}
                    empty
                    checked={product.selected}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleToggleProductChecked({
                        id: product.id,
                        checked: e.target.checked,
                      });
                    }}
                  />
                }
                headerRight={
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => {
                      handleClickDeleteProduct({ id: product.id });
                    }}
                  >
                    삭제
                  </Button>
                }
                left={<ImgBox img={product.imgUrl || ""} />}
                title={product.name}
                content={`${product.price}원`}
                description={
                  <NumberStepper
                    value={product.quantity}
                    onDecrement={() => {
                      handleChangeQuantity({
                        id: product.id,
                        quantity: product.quantity - 1,
                      });
                    }}
                    onIncrement={() => {
                      handleChangeQuantity({
                        id: product.id,
                        quantity: product.quantity + 1,
                      });
                    }}
                  />
                }
              />
            );
          })}
        </List>
        {!cartProducts.length && (
          <Notice>장바구니에 담은 상품이 없습니다.</Notice>
        )}
        {!!cartProducts.length && (
          <>
            <p>
              총 주문 금액이 {FREE_DEVERLY_FEE_THRESHOLD}원 이상일 경우 무료
              배송됩니다.
            </p>

            <DataInfo>
              <DataInfo.Item title="주문금액" content={`${cartAmount}원`} />
              <DataInfo.Item title="배송비" content={`${delveryFee}원`} />
              <DataInfo.Item
                title="총결제금액"
                content={`${paymentAmount}원`}
              />
            </DataInfo>
          </>
        )}
      </ContentBox>
      <Button
        variant="primary"
        block
        size="large"
        disabled={!cartProducts.length || !filteredCartProducts.length}
      >
        주문 확인
      </Button>
    </Layout>
  );
};
