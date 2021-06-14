export type HTTPStatusCode = number;

export type APIResponse<T> = {
  status: HTTPStatusCode;
  data: T;
};
