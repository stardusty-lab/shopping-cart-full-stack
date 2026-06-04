import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { cartsProducts } from "@/mocks/data/carts";

import { DEVERLY_FEE, FREE_DEVERLY_FEE_THRESHOLD } from "./constants";
import { Carts } from "./";

describe("장바구니 페이지 테스트", () => {
  describe("성공 케이스", () => {
    test("장바구니 목록을 불러온다", async () => {
      // ARRANGE
      render(<Carts />);

      const cartProductsCountText = `현재 ${cartsProducts.length}종류의 상품이 담겨있습니다.`;

      // ACT
      const cartProductsCount = await screen.findByText(cartProductsCountText);

      // ASSERT
      expect(cartProductsCount).toBeInTheDocument();

      cartsProducts.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
        expect(screen.getByText(`${product.price}원`)).toBeInTheDocument();
      });
    });

    test("장바구니 상품 수량을 수정한다", async () => {
      // ARRANGE
      const user = userEvent.setup();
      render(<Carts />);

      const targetProduct = cartsProducts[0];
      const expectedCartAmount =
        targetProduct.price * (targetProduct.quantity + 1) +
        cartsProducts[1].price * cartsProducts[1].quantity;

      await screen.findByText(targetProduct.name);
      const targetProductElement = screen
        .getByText(targetProduct.name)
        .closest("div");

      // ACT
      await user.click(
        within(targetProductElement as HTMLElement).getByRole("button", {
          name: "+",
        }),
      );

      // ASSERT
      expect(screen.getAllByText(`${expectedCartAmount}원`)).toHaveLength(2);
    });

    test("장바구니 상품을 삭제한다", async () => {
      // ARRANGE
      const user = userEvent.setup();
      render(<Carts />);

      const targetProduct = cartsProducts[0];
      const expectedCartProductsCountText = `현재 ${
        cartsProducts.length - 1
      }종류의 상품이 담겨있습니다.`;

      await screen.findByText(targetProduct.name);
      const targetProductElement = screen
        .getByText(targetProduct.name)
        .closest("div");

      // ACT
      await user.click(
        within(targetProductElement as HTMLElement).getByRole("button", {
          name: "삭제",
        }),
      );

      // ASSERT
      expect(
        screen.getByText(expectedCartProductsCountText),
      ).toBeInTheDocument();
      expect(screen.queryByText(targetProduct.name)).not.toBeInTheDocument();
    });

    test("선택한 상품만 주문 금액에 포함하여 계산한다", async () => {
      // ARRANGE
      const user = userEvent.setup();
      render(<Carts />);

      const unselectedProduct = cartsProducts[0];
      const selectedProduct = cartsProducts[1];
      const expectedCartAmount =
        selectedProduct.price * selectedProduct.quantity;

      await screen.findByText(unselectedProduct.name);
      const unselectedProductElement = screen
        .getByText(unselectedProduct.name)
        .closest("div");

      // ACT
      await user.click(
        within(unselectedProductElement as HTMLElement).getByRole("checkbox"),
      );

      // ASSERT
      expect(screen.getByText(`${expectedCartAmount}원`)).toBeInTheDocument();
    });

    test("주문금액이 배송비 무료 기준 미만이면 배송비를 포함해서 계산한다", async () => {
      // ARRANGE
      const user = userEvent.setup();
      render(<Carts />);

      const unselectedProduct = cartsProducts[0];
      const selectedProduct = cartsProducts[1];
      const expectedCartAmount =
        selectedProduct.price * selectedProduct.quantity;
      const expectedPaymentAmount = expectedCartAmount + DEVERLY_FEE;

      await screen.findByText(unselectedProduct.name);
      const unselectedProductElement = screen
        .getByText(unselectedProduct.name)
        .closest("div");

      // ACT
      await user.click(
        within(unselectedProductElement as HTMLElement).getByRole("checkbox"),
      );

      // ASSERT
      expect(screen.getByText(`${expectedCartAmount}원`)).toBeInTheDocument();
      expect(screen.getByText(`${DEVERLY_FEE}원`)).toBeInTheDocument();
      expect(
        screen.getByText(`${expectedPaymentAmount}원`),
      ).toBeInTheDocument();
    });

    test("주문금액이 배송비 무료 기준 이상이면 배송비를 없이 계산한다", async () => {
      // ARRANGE
      render(<Carts />);

      const expectedCartAmount = cartsProducts.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
      const expectedDeliveryFee = 0;

      expect(expectedCartAmount).toBeGreaterThanOrEqual(
        FREE_DEVERLY_FEE_THRESHOLD,
      );

      // ACT
      await screen.findByText(cartsProducts[0].name);

      // ASSERT
      expect(screen.getByText(`${expectedDeliveryFee}원`)).toBeInTheDocument();
      expect(screen.getAllByText(`${expectedCartAmount}원`)).toHaveLength(2);
    });
  });
});
