import { useState, useCallback } from "react";

import type { Options, Status, Result } from "./useExecute.types";
import { RequestAjaxError } from "../http/error";

export const useExecute = <TData = unknown>({
  executeFn,
  onSuccess,
  onError,
}: Options<TData>): Result<TData> => {
  const [status, setStatus] = useState<Status<TData>>({
    status: "idle",
    data: null,
    error: null,
  });
  const mutate = useCallback(
    async (...rest: any) => {
      setStatus({
        status: "loading",
        data: null,
        error: null,
      });

      try {
        const data = (await executeFn(...rest)) as TData;
        setStatus({
          status: "success",
          data,
          error: null,
        });
        onSuccess?.(data);
        return data;
      } catch (error: unknown) {
        setStatus({
          status: "error",
          data: null,
          error: error instanceof RequestAjaxError ? error?.data : error,
        });
        onError?.(error);
      }
    },
    [executeFn, onSuccess, onError],
  );

  return { status, mutate };
};
