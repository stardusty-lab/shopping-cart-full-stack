import { Router } from "express";

import * as orderSheetsController from "./orderSheets.controller.ts";

const orderSheetsRouter = Router();

orderSheetsRouter.get(
  "/:orderSheetId",
  orderSheetsController.getOrderSheetById,
);

orderSheetsRouter.post("/", orderSheetsController.createOrderSheet);

export default orderSheetsRouter;
