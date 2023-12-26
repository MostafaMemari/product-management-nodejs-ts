import { ValidationError, validateSync } from "class-validator";
import { Application } from "../../server";
import { HttpError, ResponseMethod } from "../../types/public.types";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export function ApiErrorHandler(error: HttpError, req: Request, res: Response, next: NextFunction) {
  const errorCode: number = error.status || 500;
  const message: string = error.message || "internal server error";
  res.status(errorCode).json({
    status: errorCode,
    ...error,
    message,
  });
}
export function NotFoundErrorHandler(req: Request, res: Response, next: NextFunction) {
  const errorCode: number = 404;
  const message: string = "Not Found Page";
  res.status(errorCode).json({
    status: errorCode,
    message,
  });
}

export function errorHandler(dto: any) {
  const errors: ValidationError[] = validateSync(dto);

  let errorTexts: any[] = [];
  for (const errorItem of errors) {
    errorTexts = errorTexts.concat(errorItem.constraints);
  }

  if (errorTexts.length > 0) throw { ...createHttpError.BadRequest(), errorTexts };

  return errorTexts;
}
