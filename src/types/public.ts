export type ResponseMethod = {
  statusCode: number;
  message?: string | undefined;
  data?: object | undefined;
  errors?: object | undefined;
};
export interface HttpError extends ErrorEvent {
  status?: number;
}
