import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { cartsProducts } from "@/mocks/data/carts";

import { Carts } from "./";

describe("장바구니 페이지 테스트", () => {
  describe("성공 케이스", () => {
    test("장바구니 목록 로드", async () => {});

    test("장바구니 상품 수량 수정", async () => {});

    test("장바구니 상품 삭제", async () => {});

    test("장바구니 배송비 무료 조건 이하인 경우 계산", async () => {});

    test("장바구니 배송비 무료 조건 이상인 경우 계산", async () => {});
  });
});
