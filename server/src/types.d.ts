import { Request } from "express";

export interface IPayload extends Request {
  id: string;
  iat: number;
  exp: number;
}

export interface RequestUserId extends Request {
  userId: any;
}
