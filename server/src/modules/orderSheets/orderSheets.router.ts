import { Router } from "express";

import * as orderSheetsController from "./orderSheets.controller.ts";

const orderSheetsRouter = Router();

orderSheetsRouter.get(
  "/:orderSheetId",
  orderSheetsController.getOrderSheetById,
);

orderSheetsRouter.post("/", orderSheetsController.createOrderSheet);

orderSheetsRouter.get(
  "/:orderSheetId/pricing",
  orderSheetsController.getOrderSheetPricing,
);

orderSheetsRouter.patch(
  "/:orderSheetId/shipping-area",
  orderSheetsController.patchOrderSheetShippingArea,
);

export default orderSheetsRouter;
