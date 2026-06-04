export const Carts = () => {
  return (
    <>
      <h1>장바구니</h1>
      <p>현재 2종류의 상품이 담겨있습니다.</p>

      <input id="all" type="checkbox" />
      <label htmlFor="all">전체선택</label>

      <hr />
      <div>
        <input id="1" type="checkbox" />
        <button>삭제</button>
        <img />
        <p>상품이름A</p>
        <p>35000원</p>
        <button>-</button>2<button>+</button>
      </div>
      <hr />
      <div>
        <input id="2" type="checkbox" />
        <button>삭제</button>
        <img />
        <p>상품이름B</p>
        <p>25000원</p>
        <button>-</button>2<button>+</button>
      </div>

      <hr />

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
