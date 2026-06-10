import { http, HttpResponse } from "msw";

import { ENV } from "@/configs/env";

import { cartsProducts as initialCartsProducts } from "@/mocks/data/carts";

const createCartsProducts = () => {
  return initialCartsProducts.map((cartsProduct) => ({ ...cartsProduct }));
};

let cartsProducts = createCartsProducts();

export const resetCartsProducts = () => {
  cartsProducts = createCartsProducts();
};

export const handlers = [
  http.get(ENV.API_URL + "/carts/:cartId", async ({ params }) => {
    const { cartId } = params;

    return HttpResponse.json(
      {
        data: { id: cartId, products: cartsProducts },
        status: 200,
      },
      { status: 200 },
    );
  }),
  http.patch(
    ENV.API_URL + "/carts/:cartId/products/:productId",
    async ({ params, request }) => {
      const productId = Number(params.productId);

      const data = (await request.clone().json()) as { quantity: number };

      const productData = cartsProducts.find(
        (product) => product.id === productId,
      ) as { quantity: number };

      productData.quantity = data.quantity;

      return HttpResponse.json(
        {
          data: productData,
          status: 200,
        },
        {
          status: 200,
        },
      );
    },
  ),
  http.delete(
    ENV.API_URL + "/carts/:cartId/products/:productId",
    async ({ params }) => {
      const productId = Number(params.productId);

      cartsProducts = cartsProducts.filter((cartsProduct) => {
        return cartsProduct.id !== productId;
      });

      return new HttpResponse(null, { status: 204 });
    },
  ),
];
