import { Expose } from "class-transformer";
import { Matches } from "class-validator";
import { ObjectId } from "mongoose";

export type ResponseMethod = {
  status: number;
  message?: string | undefined;
  data?: object | undefined;
  errors?: object | undefined;
};
export interface HttpError extends ErrorEvent {
  status?: number;
}
export class ObjectIdDTO {
  @Expose()
  @Matches(RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i), {
    message: "object id is not valid",
  })
  id: ObjectId;
}

export type FindDoc<T> = T | null | undefined;
