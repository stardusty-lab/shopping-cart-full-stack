import type { ChangeEvent } from "react";

import { useNavigate } from "react-router-dom";

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
import { Loading } from "@/core/components/Loading";
import { Alert } from "@/core/components/Alert";

import { toLocaleString } from "@/core/utils/format";

import { ROUTES } from "@/constants/routes";

import { useCartsActions } from "./useCartsActions";

import { DELIVERY_FEE, FREE_DELIVERY_FEE_THRESHOLD } from "./constants";

const ERROR_MESSAGES = {
  TYPE_MISMATCH: "잘못된 형식의 요청입니다. 입력값을 확인해주세요.",
  NO_JSON: "잘못된 요청입니다. 다시 시도해주세요.",
  ROUTE_NOT_FOUND: "요청한 기능을 찾을 수 없습니다. 잠시 후 다시 시도해주세요.",
};

export const Carts = () => {
  const {
    loadCartsProductsStatus,
    cartProducts,
    updateProductQuantityError,
    updateProductQuantity,
    deleteProduct,
    updateProductSelection,
    updateAllProductSelection,

    openAlert,
    onAlertClose,
  } = useCartsActions();

  const errorCode = (updateProductQuantityError as { errorCode: string } | null)
    ?.errorCode;

  const errorMessage =
    errorCode && errorCode in ERROR_MESSAGES
      ? ERROR_MESSAGES[errorCode as keyof typeof ERROR_MESSAGES]
      : "";

  const handleChangeQuantity = ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    updateProductQuantity({ id, quantity });
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

  const navigate = useNavigate();
  const handleClickOrderReview = () => {
    navigate(ROUTES.ORDER_REVIEW, {
      state: {
        products: filteredCartProducts.map((product) => product.quantity),
        paymentAmount,
      },
    });
  };

  const filteredCartProducts = cartProducts.filter(
    (product) => product.selected,
  );

  const cartAmount = filteredCartProducts.reduce((acc, selectedProduct) => {
    acc += selectedProduct.price * selectedProduct.quantity;
    return acc;
  }, 0);
  const deliveryFee =
    cartAmount >= FREE_DELIVERY_FEE_THRESHOLD ? 0 : DELIVERY_FEE;
  const paymentAmount = cartAmount + deliveryFee;

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
        {loadCartsProductsStatus === "loading" && <Loading>loading...</Loading>}
        <List>
          {cartProducts.map((product) => {
            return (
              <List.Item
                key={product.id}
                data-testid={`cart-product-${product.id}`}
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
                content={`${toLocaleString(product.price)}원`}
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
              총 주문 금액이 {FREE_DELIVERY_FEE_THRESHOLD}원 이상일 경우 무료
              배송됩니다.
            </p>

            <DataInfo>
              <DataInfo.Item
                title="주문금액"
                content={`${toLocaleString(cartAmount)}원`}
              />
              <DataInfo.Item
                title="배송비"
                content={`${toLocaleString(deliveryFee)}원`}
              />
              <DataInfo.Item
                title="총결제금액"
                content={`${toLocaleString(paymentAmount)}원`}
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
        onClick={handleClickOrderReview}
      >
        주문 확인
      </Button>
      {openAlert && <Alert onClose={onAlertClose}>{errorMessage}</Alert>}
    </Layout>
  );
};
