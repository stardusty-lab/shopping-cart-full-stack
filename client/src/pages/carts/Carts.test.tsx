import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { cartsProducts } from "@/mocks/data/carts";

import { Carts } from "./";

describe("장바구니 페이지 테스트", () => {
  describe("성공 케이스", () => {
    test("장바구니 목록을 불러온다", async () => {});

    test("장바구니 상품 수량을 수정한다", async () => {});

    test("장바구니 상품을 삭제한다", async () => {});

    test("주문금액이 배송비 무료 기준 미만이면 배송비를 포함해서 계산한다", async () => {});

    test("주문금액이 배송비 무료 기준 이상이면 배송비를 없이 계산한다", async () => {});
  });
});
