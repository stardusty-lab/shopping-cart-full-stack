import { Navigate } from "react-router";

import type { ReactNode } from "react";

import { ROUTES } from "@/constants/routes";

import { Carts } from "@/pages/carts/Carts";
import { OrderReview } from "@/pages/orderReview";

export interface RouteItem {
  path: string;
  element: ReactNode;
  children?: RouteItem[];
}

export const routes: RouteItem[] = [
  { path: ROUTES.HOME, element: <Navigate to={ROUTES.CARTS} replace /> },
  { path: ROUTES.CARTS, element: <Carts /> },
  { path: ROUTES.ORDER_REVIEW, element: <OrderReview /> },
];
