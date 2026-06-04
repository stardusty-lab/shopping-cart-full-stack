import { http, HttpResponse } from "msw";

import { cartsProducts } from "../data/carts";

export const handlers = [
  http.get("/carts/:cartId", async ({ params }) => {
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
    "/carts/:cartId/products/:productId",
    async ({ params, request }) => {
      const productId = Number(params.productId);

      const data = (await request.clone().json()) as { quantity: number };

      const productData = cartsProducts.find(
        (product) => product.id === productId,
      ) as { quantity: number };

      productData.quantity = data.quantity;

      return HttpResponse.json(
        {
          data: {
            ...productData,
          },
          status: 200,
        },
        {
          status: 200,
        },
      );
    },
  ),
  http.delete("/carts/:cartId/products/:productId", async () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
