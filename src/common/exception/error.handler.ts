import { ValidationError, validateSync } from "class-validator";
import { Application } from "../../server";
import { HttpError, ResponseMethod } from "../../types/public";
import { Request, Response, NextFunction } from "express";

export function ApiErrorHandler(error: HttpError, req: Request, res: Response, next: NextFunction) {
  const errorCode: number = error.status || 500;
  const message: string = error.message || "internal server error";
  res.status(errorCode).json({
    ...error,
    status: errorCode,
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
  if (errorTexts.length > 0) throw { status: 400, message: "validation Error", errorTexts };

  return errorTexts;
}
