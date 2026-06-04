import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/carts/:cartId", async ({ params }) => {
    const { cartId } = params;

    return HttpResponse.json(
      {
        data: { id: cartId, products: [] },
        status: 200,
      },
      { status: 200 },
    );
  }),
  http.patch(
    "/carts/:cartId/products/:productId",
    async ({ params, request }) => {
      const { productId } = params;
      const data = (await request.clone().json()) as { quantity: number };

      return HttpResponse.json(
        {
          data: {
            id: productId,
            name: "",
            price: 0,
            imgUrl: "",
            quantity: data.quantity,
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
