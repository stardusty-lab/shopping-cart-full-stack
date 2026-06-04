import { useCarts } from "./useCarts";

export const Carts = () => {
  const {
    cartProducts,
    updateProductQuauntity,
    deleteProduct,
    updateProductSelection,
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

  const handleToggleProductChecked = ({
    id,
    checked,
  }: {
    id: number;
    checked: boolean;
  }) => {
    updateProductSelection({ id, selected: checked });
  };

  return (
    <>
      <h1>장바구니</h1>
      <p>현재 {cartProducts.length}종류의 상품이 담겨있습니다.</p>

      <input id="all" type="checkbox" />
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

      <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>

      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>주문금액</div>
        <div>70000원</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>배송비</div>
        <div>3,000원</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>총결제금액</div>
        <div>73,000원</div>
      </div>
    </>
  );
};
