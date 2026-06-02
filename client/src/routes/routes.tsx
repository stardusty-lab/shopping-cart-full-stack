import type { ReactNode } from "react";

import { ROUTES } from "@/constants/routes";

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
];
