import { AdminEntity } from "../entities/AdminEntity";
import {
  AdminDeletionResponse,
  AdminResponse,
  EmailPasswordInput,
} from "../inputAndObjectTypes/AdminResolver";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { Context } from "../types";
import argon2 from "argon2";
import { validateAdminEmailAndPassword } from "../utils/validateAdminEmailAndPassword";
import { destroySession } from "../utils/destroySession";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class AdminResolver {
  /**
   * Allows only 1 instance of Admin.
   * Currently not logging in after registration.
   */
  @Mutation(() => AdminResponse)
  async createAdmin(
    @Arg("input") input: EmailPasswordInput
  ): Promise<AdminResponse> {
    const adminCheck = await AdminEntity.find({});
    if (adminCheck.length > 0) {
      return { error: "Only one instance of admin is allowed" };
    }

    const { email, password } = input;

    if (!email.includes("@")) {
      return { error: "Invalid email; should contain @" };
    }
    const hashedPassword = await argon2.hash(password);
    const admin = await AdminEntity.create({
      email,
      password: hashedPassword,
    }).save();

    //Do not return the hasedpassword
    return { admin: { email: admin.email } };
  }

  //Only the admin can delete itself
  @Mutation(() => AdminDeletionResponse)
  @UseMiddleware(isAuth)
  async deleteAdmin(
    @Arg("input") input: EmailPasswordInput,
    @Ctx() { req, res }: Context
  ): Promise<AdminDeletionResponse> {
    destroySession({ req, res });
    const { error, admin } = await validateAdminEmailAndPassword(input);

    if (error || !admin) return { error };

    await AdminEntity.remove(admin as AdminEntity);
    destroySession({ req, res });

    return { message: "Deletion successful" };
  }

  @Mutation(() => AdminResponse)
  async adminLogin(
    @Arg("input") input: EmailPasswordInput,
    @Ctx() { req }: Context
  ): Promise<AdminResponse> {
    const { error, admin } = await validateAdminEmailAndPassword(input);

    if (error || !admin) return { error: error as string };

    req.session.adminId = (admin as AdminEntity).id;

    return { admin };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async adminLogout(@Ctx() { req, res }: Context) {
    return destroySession({ req, res });
  }

  @Query(() => [AdminEntity])
  async showAdmins(): Promise<AdminEntity[]> {
    const admins = await AdminEntity.find({});
    return admins;
  }

  @Query(() => Boolean)
  async me(@Ctx() { req }: Context): Promise<Boolean> {
    if (req.session.adminId) return true;
    return false;
  }
}
