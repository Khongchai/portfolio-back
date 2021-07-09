import { ProjectEntity } from "../entities/ProjectEntity";
import { InputType, Field, ObjectType } from "type-graphql";

///////////////////////// NOT EXPORTED ////////////////////////////////////////////////////
@InputType()
class TechnologyProperties {
  @Field(() => [String], { nullable: true })
  frontEndNames: string[];

  @Field(() => [String], { nullable: true })
  backEndNames: string[];

  @Field(() => [String], { nullable: true })
  languagesNames: string[];

  @Field(() => [String], { nullable: true })
  hostingServiceNames: string[];
}

///////////////////////// EXPORTED ////////////////////////////////////////////////////
@InputType()
export class ProjectCreationInput {
  @Field()
  startDate!: string;

  @Field({ nullable: true })
  endDate: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  shortDescription!: string;

  @Field()
  githubLink!: string;

  @Field({ nullable: true })
  websiteLink: string;

  @Field({ nullable: true })
  imgLink: string;

  @Field({ nullable: true })
  tinyImgLink: string;

  @Field(() => TechnologyProperties, { nullable: true })
  techProps: TechnologyProperties;

  @Field(() => Boolean, { nullable: true })
  isHighlight: boolean | undefined;
}

@InputType()
export class AddTechInput {
  @Field()
  projTitle!: string;

  @Field(() => TechnologyProperties, { nullable: true })
  techProps: TechnologyProperties;
}

@ObjectType()
export class ErrorField {
  @Field()
  message: string;
}

@ObjectType()
export class ProjResponse {
  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];

  @Field(() => ProjectEntity, { nullable: true })
  proj?: ProjectEntity;
}

@ObjectType()
export class PaginatedProjects {
  @Field(() => [ProjectEntity])
  projects: ProjectEntity[];

  @Field(() => Boolean)
  isFirstQuery: boolean;

  @Field(() => Boolean)
  isLastQuery: boolean;
}
