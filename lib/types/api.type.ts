declare type ErrorResponse = {
  code: number;
  error_code: string;
  msg: string;
};

declare type SuccessResponse<T> = {
  message: string;
} & T;
declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;
