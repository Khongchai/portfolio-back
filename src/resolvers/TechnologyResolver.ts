import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getManager } from "typeorm";
import { TechnologyEntity } from "../entities/TechnologyEntity";
import { TechAsSeparateFields } from "../inputAndObjectTypes/TechnologyResolver";
import { isAuth } from "../middleware/isAuth";
import { Context } from "../types";
import { getTechnologiesBasedOnRoles } from "../utils/getTechnologiesBasedOnRoles";

@Resolver()
export class TechnologyResolver {
  /**
   * This gets all technologies without categorization
   */
  @Query(() => [TechnologyEntity])
  async technologies(): Promise<TechnologyEntity[]> {
    const technologies = await TechnologyEntity.find({
      relations: ["frontEndIn", "backEndIn", "languageOf", "hosting"],
    });
    return technologies;
  }

  /**
   * Find out what something is by referring to their relation tables.
   * This way, we know that "Python" is a backend language and that "heroku"
   * is not a language but a hosting service
   *
   * Doing this infers the role of each tech from their usage, rather than explicit description.
   * This also takes into account stuff that are not used in projects as well (excluding stuff that is being learned, but not used).
   *
   */
  @Query(() => TechAsSeparateFields)
  async getTechnologiesAssignedToRole(): Promise<{
    front: TechnologyEntity[];
    back: TechnologyEntity[];
    lang: TechnologyEntity[];
    hosting: TechnologyEntity[];
  }> {
    const entityManager = getManager();

    const languages = await getTechnologiesBasedOnRoles(
      "language",
      entityManager
    );
    const frontends = await getTechnologiesBasedOnRoles("front", entityManager);
    const backends = await getTechnologiesBasedOnRoles("back", entityManager);
    const hostingServices = await getTechnologiesBasedOnRoles(
      "hosting",
      entityManager
    );

    return {
      front: frontends,
      back: backends,
      lang: languages,
      hosting: hostingServices,
    };
  }

  @Mutation(() => TechnologyEntity, { nullable: true })
  @UseMiddleware(isAuth)
  async createTechnology(
    @Arg("title") title: string
  ): Promise<TechnologyEntity | null> {
    const tech = await TechnologyEntity.create({
      title: title,
    }).save();

    //TODO check if proj exists, if not, returns error, else add to the new technology.
    //Should be achieved with a query builder
    return tech;
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async deleteAllTechnologies(@Ctx() {}: Context): Promise<string> {
    const techToBeDeleted = await TechnologyEntity.find({});
    if (techToBeDeleted.length === 0) {
      return "No more technologies left to delete.";
    } else {
      await TechnologyEntity.remove(techToBeDeleted);
      return "All technologies deleted successfully.";
    }
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async deleteTechnolgy(@Arg("title") title: string): Promise<string> {
    const techToBeDeleted = await TechnologyEntity.findOne({
      where: { title },
    });
    if (!techToBeDeleted) {
      return `Technology ${title} does not exist.`;
    } else {
      await TechnologyEntity.remove(techToBeDeleted);
      return "Technology deleted successfully.";
    }
  }
}
