import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { renderProvider } from "../../../tests/utils/render";

import { cartsProducts } from "@/mocks/data/carts";
import { resetCartsProducts } from "@/mocks/msw/handlers/carts";

import { formatNumber } from "../../core/utils/format";

import { DELIVERY_FEE, FREE_DELIVERY_FEE_THRESHOLD } from "./constants";
import { Carts } from "./";

const getCartProductElement = async (productName: string) => {
  await screen.findByText(productName);
  const product = cartsProducts.find(({ name }) => name === productName);
  const productElement = product
    ? screen.getByTestId(`cart-product-${product.id}`)
    : null;

  if (!productElement) {
    throw new Error(`${productName} 상품 영역을 찾을 수 없습니다.`);
  }

  return productElement;
};

describe("장바구니 페이지 테스트", () => {
  beforeEach(() => {
    resetCartsProducts();
  });
  describe("성공 케이스", () => {
    test("장바구니 목록을 불러온다", async () => {
      // ARRANGE
      renderProvider(<Carts />);

      const cartProductsCountText = `현재 ${cartsProducts.length}종류의 상품이 담겨있습니다.`;

      // ACT
      const cartProductsCount = await screen.findByText(cartProductsCountText);

      // ASSERT
      expect(cartProductsCount).toBeInTheDocument();

      cartsProducts.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
        expect(
          screen.getByText(`${formatNumber(product.price)}원`),
        ).toBeInTheDocument();
      });
    });

    test("장바구니 상품 수량을 수정한다", async () => {
      // ARRANGE
      const user = userEvent.setup();
      renderProvider(<Carts />);

      const targetProduct = cartsProducts[0];
      const expectedCartAmount =
        targetProduct.price * (targetProduct.quantity + 1) +
        cartsProducts[1].price * cartsProducts[1].quantity;

      const targetProductElement = await getCartProductElement(
        targetProduct.name,
      );

      // ACT
      await user.click(
        within(targetProductElement).getByRole("button", {
          name: "+",
        }),
      );

      // ASSERT
      await waitFor(() => {
        expect(
          screen.getAllByText(`${formatNumber(expectedCartAmount)}원`),
        ).toHaveLength(2);
      });
    });

    test("장바구니 상품을 삭제한다", async () => {
      // ARRANGE
      const user = userEvent.setup();
      renderProvider(<Carts />);

      const targetProduct = cartsProducts[0];
      const expectedCartProductsCountText = `현재 ${
        cartsProducts.length - 1
      }종류의 상품이 담겨있습니다.`;

      const targetProductElement = await getCartProductElement(
        targetProduct.name,
      );

      // ACT
      await user.click(
        within(targetProductElement).getByRole("button", {
          name: "삭제",
        }),
      );

      // ASSERT
      await waitFor(() => {
        expect(
          screen.getByText(expectedCartProductsCountText),
        ).toBeInTheDocument();
        expect(screen.queryByText(targetProduct.name)).not.toBeInTheDocument();
      });
    });

    test("선택한 상품만 주문 금액에 포함하여 계산한다", async () => {
      // ARRANGE
      const user = userEvent.setup();
      renderProvider(<Carts />);

      const unselectedProduct = cartsProducts[0];
      const selectedProduct = cartsProducts[1];
      const expectedCartAmount =
        selectedProduct.price * selectedProduct.quantity;

      const unselectedProductElement = await getCartProductElement(
        unselectedProduct.name,
      );

      // ACT
      await user.click(within(unselectedProductElement).getByRole("checkbox"));

      // ASSERT
      await waitFor(() => {
        expect(
          screen.getByText(`${formatNumber(expectedCartAmount)}원`),
        ).toBeInTheDocument();
      });
    });

    test("주문금액이 배송비 무료 기준 미만이면 배송비를 포함해서 계산한다", async () => {
      // ARRANGE
      const user = userEvent.setup();
      renderProvider(<Carts />);

      const unselectedProduct = cartsProducts[0];
      const selectedProduct = cartsProducts[1];
      const expectedCartAmount =
        selectedProduct.price * selectedProduct.quantity;
      const expectedPaymentAmount = expectedCartAmount + DELIVERY_FEE;

      const unselectedProductElement = await getCartProductElement(
        unselectedProduct.name,
      );

      // ACT
      await user.click(within(unselectedProductElement).getByRole("checkbox"));

      // ASSERT
      await waitFor(() => {
        expect(
          screen.getByText(`${formatNumber(expectedCartAmount)}원`),
        ).toBeInTheDocument();
        expect(
          screen.getByText(`${formatNumber(DELIVERY_FEE)}원`),
        ).toBeInTheDocument();
        expect(
          screen.getByText(`${formatNumber(expectedPaymentAmount)}원`),
        ).toBeInTheDocument();
      });
    });

    test("주문금액이 배송비 무료 기준 이상이면 배송비를 없이 계산한다", async () => {
      // ARRANGE
      renderProvider(<Carts />);

      const expectedCartAmount = cartsProducts.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
      const expectedDeliveryFee = 0;

      expect(expectedCartAmount).toBeGreaterThanOrEqual(
        FREE_DELIVERY_FEE_THRESHOLD,
      );

      // ACT
      await screen.findByText(cartsProducts[0].name);

      // ASSERT
      expect(
        screen.getByText(`${formatNumber(expectedDeliveryFee)}원`),
      ).toBeInTheDocument();
      expect(
        screen.getAllByText(`${formatNumber(expectedCartAmount)}원`),
      ).toHaveLength(2);
    });
  });
});
