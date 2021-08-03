export interface ResponseError extends Error {
  data?: any;
  statusCode?: number;
}
