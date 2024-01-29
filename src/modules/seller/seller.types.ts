import { Document, ObjectId } from "mongoose";

export interface ISeller extends Document {
  sellerID: number;
  sellerTitle: string;
  token: string;
  isRobot?: boolean;
  accessTokenDigiKala?: string;
}
