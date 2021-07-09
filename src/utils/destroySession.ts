import { COOKIE_NAME } from "../constants";
import { Context } from "../types";

export const destroySession = ({ req, res }: Pick<Context, "req" | "res">) => {
  return new Promise((resolve) =>
    req!.session.destroy((err) => {
      res!.clearCookie(COOKIE_NAME);
      if (err) {
        console.log("Logout error: ", err);
        resolve(false);
      }
      resolve(true);
    })
  );
};
