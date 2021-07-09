import { AdminEntity } from "../entities/AdminEntity";
import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class EmailPasswordInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class AdminResponse {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => AdminEntity, { nullable: true })
  admin?: Partial<AdminEntity>;
}

@ObjectType()
export class AdminDeletionResponse {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => String, { nullable: true })
  message?: string;
}
