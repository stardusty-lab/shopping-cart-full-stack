import type { ReactNode } from "react";
import type { ErrorPolicy, ErrorPolicyMap } from "./errorPolicy.types";

export const LOAD_ERROR_POLICY: ErrorPolicyMap = {
  RESOURCE_NOT_FOUND: { type: "field", message: "" },
  ROUTE_NOT_FOUND: { type: "field", message: "" },
} as const;

export const UPDATE_QUANTITY_ERROR_POLICY: ErrorPolicyMap = {
  MISSING_FIELD: { type: "ignore" },
  INVALID: { type: "ignore" },
  RESOURCE_NOT_FOUND: { type: "ignore" },
  TYPE_MISMATCH: {
    type: "alert",
    message: "잘못된 형식의 요청입니다. 입력값을 확인해주세요.",
  },
  NO_JSON: { type: "alert", message: "잘못된 요청입니다. 다시 시도해주세요." },
  ROUTE_NOT_FOUND: {
    type: "alert",
    message: "요청한 기능을 찾을 수 없습니다. 잠시 후 다시 시도해주세요.",
  },
} as const;

export const applyErrorPolicy = (
  policy: ErrorPolicy,
  options: {
    [policyKey in ErrorPolicy["type"]]: (
      policy: ErrorPolicy,
    ) => ReactNode | void;
  },
) => {
  if (!policy) return;

  const handler = options[policy.type];
  if (!handler) return;

  if ("message" in policy) {
    return handler(policy);
  }
};
