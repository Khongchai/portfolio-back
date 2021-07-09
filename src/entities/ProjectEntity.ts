import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
} from "typeorm";
import { TechnologyEntity } from "./TechnologyEntity";

@ObjectType()
@Entity()
export class ProjectEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  shortDescription!: string;

  @Field()
  @Column()
  githubLink!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  websiteLink: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imgLink: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tinyImgLink: string;

  @Field(() => [TechnologyEntity], { nullable: true })
  @ManyToMany(() => TechnologyEntity, (tech) => tech.frontEndIn)
  frontEndTechnologies: TechnologyEntity[];

  @Field(() => [TechnologyEntity], { nullable: true })
  @ManyToMany(() => TechnologyEntity, (tech) => tech.backEndIn)
  backEndTechnologies: TechnologyEntity[];

  @Field(() => [TechnologyEntity], { nullable: true })
  @ManyToMany(() => TechnologyEntity, (tech) => tech.languageOf)
  languages: TechnologyEntity[];

  @Field(() => [TechnologyEntity], { nullable: true })
  @ManyToMany(() => TechnologyEntity, (tech) => tech.hosting)
  hostingServices: TechnologyEntity[];

  //format: YYYY-MM-DD
  @Field()
  @Column()
  startDate!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  endDate: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  isHighlight: Boolean;
}
