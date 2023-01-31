import { Request, Response } from "express";

export type Context = {
  req: Request & { session: { adminId: number } };
  res: Response;
};
