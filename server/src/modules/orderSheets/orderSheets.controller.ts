import type { Request, Response } from "express";

import { success } from "../../common/response.ts";
import * as orderSheetsService from "./orderSheets.service.ts";

export const getOrderSheetById = (req: Request, res: Response) => {
  const orderSheetId = Number(req.params.orderSheetId);
  const orderSheet = orderSheetsService.getOrderSheetById(orderSheetId);

  return success(res, orderSheet);
};
