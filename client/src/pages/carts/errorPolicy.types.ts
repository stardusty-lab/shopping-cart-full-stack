import type { ReactNode } from "react";

export type ErrorPolicy =
  | {
      type: "ignore";
    }
  | {
      type: "field";
      message: ReactNode;
    }
  | {
      type: "alert";
      message: ReactNode;
    };

export type ErrorPolicyMap = Record<string, ErrorPolicy>;
