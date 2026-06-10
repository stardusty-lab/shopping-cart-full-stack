import { http, HttpResponse } from "msw";

import { handlers as cartsHandlers } from "./carts";

export const handlers = [
  http.get("/health", () => {
    return HttpResponse.json({});
  }),
  ...cartsHandlers,
];
