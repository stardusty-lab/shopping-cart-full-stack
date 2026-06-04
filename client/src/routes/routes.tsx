import type { ReactNode } from "react";

import { ROUTES } from "@/constants/routes";

import { Carts } from "@/pages/carts/Carts";

export interface RouteItem {
  path: string;
  element: ReactNode;
  children?: RouteItem[];
}

const DummyPage = () => {
  return "DummyPage";
};

export const routes: RouteItem[] = [
  { path: ROUTES.HOME, element: <DummyPage /> },
  { path: ROUTES.CARTS, element: <Carts /> },
];
