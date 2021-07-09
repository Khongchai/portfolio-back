import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { ProjectEntity } from "./ProjectEntity";

@ObjectType()
@Entity()
export class TechnologyEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  title!: string;

  @Field(() => [ProjectEntity], { nullable: true })
  @ManyToMany(() => ProjectEntity, (proj) => proj.frontEndTechnologies, {
    cascade: true,
  })
  @JoinTable()
  frontEndIn: ProjectEntity[];

  @Field(() => [ProjectEntity], { nullable: true })
  @ManyToMany(() => ProjectEntity, (proj) => proj.backEndTechnologies, {
    cascade: true,
  })
  @JoinTable()
  backEndIn: ProjectEntity[];

  @Field(() => [ProjectEntity], { nullable: true })
  @ManyToMany(() => ProjectEntity, (proj) => proj.languages, {
    cascade: true,
  })
  @JoinTable()
  languageOf: ProjectEntity[];

  @Field(() => [ProjectEntity], { nullable: true })
  @ManyToMany(() => ProjectEntity, (proj) => proj.hostingServices, {
    cascade: true,
  })
  @JoinTable()
  hosting: ProjectEntity[];
}
