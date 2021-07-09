import { TechnologyEntity } from "../entities/TechnologyEntity";
import { Field, ObjectType } from "type-graphql/dist/decorators";

@ObjectType()
export class TechAsSeparateFields {
  @Field(() => [TechnologyEntity], { nullable: true })
  front: [TechnologyEntity];

  @Field(() => [TechnologyEntity], { nullable: true })
  back: [TechnologyEntity];

  @Field(() => [TechnologyEntity], { nullable: true })
  lang: [TechnologyEntity];

  @Field(() => [TechnologyEntity], { nullable: true })
  hosting: [TechnologyEntity];
}

@ObjectType()
export class ErrorField {
  @Field()
  error?: string;

  @Field({ nullable: true })
  description?: string;
}
