import { useCarts } from "./useCarts";

import { DEVERLY_FEE, FREE_DEVERLY_FEE_THRESHOLD } from "./constants";

export const Carts = () => {
  const {
    cartProducts,
    updateProductQuauntity,
    deleteProduct,
    updateProductSelection,
    updateAllProductSelection,
  } = useCarts();

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

  const cartAmount = cartProducts
    .filter((product) => product.selected)
    .reduce((acc, selectedProduct) => {
      acc += selectedProduct.price * selectedProduct.quantity;
      return acc;
    }, 0);
  const delveryFee = DEVERLY_FEE;
  const paymentAmount = cartAmount + delveryFee;

  return (
    <>
      <h1>장바구니</h1>
      <p>현재 {cartProducts.length}종류의 상품이 담겨있습니다.</p>

      <input
        id="all"
        type="checkbox"
        checked={isAllChecked}
        onChange={(e) => {
          handleAllToogleProductChecked({ checked: e.target.checked });
        }}
      />
      <label htmlFor="all">전체선택</label>

      <hr />
      {cartProducts.map((product) => {
        return (
          <>
            <div>
              <input
                id={String(product.id)}
                name={String(product.id)}
                type="checkbox"
                checked={product.selected}
                onChange={(e) => {
                  handleToggleProductChecked({
                    id: product.id,
                    checked: e.target.checked,
                  });
                }}
              />
              <button
                onClick={() => {
                  handleClickDeleteProduct({ id: product.id });
                }}
              >
                삭제
              </button>
              <img src={product.imgUrl} alt="" />
              <p>{product.name}</p>
              <p>{product.price}원</p>
              <button
                onClick={() => {
                  handleChangeQuantity({
                    id: product.id,
                    quantity: product.quantity - 1,
                  });
                }}
              >
                -
              </button>
              {product.quantity}
              <button
                onClick={() => {
                  handleChangeQuantity({
                    id: product.id,
                    quantity: product.quantity + 1,
                  });
                }}
              >
                +
              </button>
            </div>
            <hr />
          </>
        );
      })}

      <p>
        총 주문 금액이 {FREE_DEVERLY_FEE_THRESHOLD}원 이상일 경우 무료
        배송됩니다.
      </p>

      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>주문금액</div>
        <div>{cartAmount}원</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>배송비</div>
        <div>{delveryFee}원</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>총결제금액</div>
        <div>{paymentAmount}원</div>
      </div>
    </>
  );
};
