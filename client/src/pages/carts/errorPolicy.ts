export const ERROR_POLICY = {
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
  policy: (typeof ERROR_POLICY)[keyof typeof ERROR_POLICY],
  options: {
    [policyKey in (typeof ERROR_POLICY)[keyof typeof ERROR_POLICY]["type"]]: (
      policy?: (typeof ERROR_POLICY)[keyof typeof ERROR_POLICY],
    ) => void;
  },
) => {
  if (!policy) return;

  const handler =
    options[
      policy.type as (typeof ERROR_POLICY)[keyof typeof ERROR_POLICY]["type"]
    ];
  if (!handler) return;

  if ("message" in policy) {
    handler(policy);
  }
};
