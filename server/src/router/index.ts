import { Router } from "express";

import cartsRouter from "../modules/carts/carts.router.ts";
import productsRouter from "../modules/products/products.router.ts";
import shippingFeeRouter from "../modules/shippingFee/shippingFee.router.ts";
import couponsRouter from "../modules/coupons/coupons.router.ts";

const router = Router();

router.use("/carts", cartsRouter);
router.use("/products", productsRouter);
router.use("/shipping-fee", shippingFeeRouter);
router.use("/coupons", couponsRouter);

export default router;
