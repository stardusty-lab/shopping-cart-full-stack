import { useEffect, useState } from "react";

import { cartsProducts } from "@/mocks/data/carts";

interface CartProduct {
  id: number;
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
}

export const Carts = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    setCartProducts(cartsProducts);
  }, []);

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
              />
              <button>삭제</button>
              <img src={product.imgUrl} alt="" />
              <p>{product.name}</p>
              <p>{product.price}원</p>
              <button>-</button>
              {product.quantity}
              <button>+</button>
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
