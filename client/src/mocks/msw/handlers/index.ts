import { http, HttpResponse } from "msw";

import { handlers as cartsHandlers } from "./carts";
import { handlers as shippingFeeHandlers } from "./shippingFee";

export const handlers = [
  http.get("/health", () => {
    return HttpResponse.json({});
  }),
  ...cartsHandlers,
  ...shippingFeeHandlers,
];
