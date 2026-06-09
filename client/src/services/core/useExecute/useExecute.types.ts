export type Status = "idle" | "loading" | "success" | "error";

export type Options<TData = unknown> = {
  executeFn: (...rest: any) => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
};

type IdleStatus = {
  status: "idle";
  data: null;
  error: null;
};

type SuccessStatus<TData> = {
  status: "success";
  data: TData;
  error: null;
};

type ErrorStatus = {
  status: "error";
  data: null;
  error: unknown;
};

type LoadingStatus = {
  status: "loading";
  data: null;
  error: null;
};

export type Result<TData = unknown> =
  | IdleStatus
  | SuccessStatus<TData>
  | ErrorStatus
  | LoadingStatus;
