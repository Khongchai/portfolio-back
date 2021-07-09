import { Context } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.req.session.adminId) {
    throw new Error("not authenticated");
  }
  return next();
};
