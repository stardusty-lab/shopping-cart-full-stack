import { http, HttpResponse } from "msw";

import { ENV } from "@/configs/env";

import { cartsProducts } from "@/mocks/data/carts";

const createCartsProducts = () => {
  return cartsProducts.map((cartsProduct) => ({ ...cartsProduct }));
};

const mockCartsProducts = createCartsProducts();

export const handlers = [
  http.get(ENV.API_URL + "/carts/:cartId", async ({ params }) => {
    const { cartId } = params;

    return HttpResponse.json(
      {
        data: { id: cartId, products: mockCartsProducts },
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

      const productData = mockCartsProducts.find(
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
  http.delete(ENV.API_URL + "/carts/:cartId/products/:productId", async () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
