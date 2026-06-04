export interface RepsonseDTO<TStatus extends number, TData> {
  status: TStatus;
  data: TData;
}
