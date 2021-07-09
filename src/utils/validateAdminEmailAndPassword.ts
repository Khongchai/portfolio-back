import { AdminEntity } from "../entities/AdminEntity";
import {
  AdminResponse,
  EmailPasswordInput,
} from "../inputAndObjectTypes/AdminResolver";
import argon2 from "argon2";

/**
 * For security reasons, it does not inform whether an email is invalid because provided email is wrong or if no admin exists.
 */
export async function validateAdminEmailAndPassword(
  input: EmailPasswordInput
): Promise<AdminResponse> {
  const { email, password } = input;
  const admin = await AdminEntity.findOne({ where: { email } });
  if (!admin) {
    return {
      error: "Invalid admin email",
    };
  }
  const validPassword = await argon2.verify(admin?.password, password);
  if (!validPassword) return { error: "Invalid admin password" };
  return { admin };
}
