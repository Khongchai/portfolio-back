import { Request, Response } from "express";
import { RedisClient } from "redis";

export type Context = {
  req: Request & { session: { adminId: number } };
  res: Response;
  redis: RedisClient;
};
