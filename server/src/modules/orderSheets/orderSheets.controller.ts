import type { Request, Response } from "express";

import { success } from "../../common/response.ts";
import * as orderSheetsService from "./orderSheets.service.ts";

export const getOrderSheetById = (req: Request, res: Response) => {
  const orderSheetId = Number(req.params.orderSheetId);
  const orderSheet = orderSheetsService.getOrderSheetById(orderSheetId);

  return success(res, orderSheet);
};

export const createOrderSheet = (req: Request, res: Response) => {
  const products = req.body.products;
  const orderSheet = orderSheetsService.createOrderSheet(products);

  return success(res, { id: orderSheet.id });
};

export const getOrderSheetPricing = (req: Request, res: Response) => {
  const orderSheetId = Number(req.params.orderSheetId);

  const pricing = orderSheetsService.getOrderSheetPricing(orderSheetId);

  return success(res, { pricing });
};

export const patchOrderSheetShippingArea = (req: Request, res: Response) => {
  const orderSheetId = Number(req.params.orderSheetId);
  const isRemoteShippingArea = req.body.isRemoteShippingArea;

  const orderSheet = orderSheetsService.patchOrderSheetShippingArea(
    orderSheetId,
    isRemoteShippingArea,
  );

  return success(res, undefined);
};

export const getOrderSheetAbleCoupons = (req: Request, res: Response) => {
  const orderSheetId = Number(req.params.orderSheetId);

  const able = orderSheetsService.getOrderSheetAbleCoupons(orderSheetId);

  return success(res, { able });
};
