import { TechnologyEntity } from "../entities/TechnologyEntity";
import { getManager } from "typeorm";

export async function getTechnologiesByTitle(
  titles: string[]
): Promise<TechnologyEntity[] | []> {
  if (titles.length > 0) {
    return await getManager()
      .createQueryBuilder(TechnologyEntity, "tech")
      .where("tech.title IN (:...titles)", { titles })
      .orderBy("tech.title")
      .getMany();
  }
  return [];
}

export async function getTechListForEachProp(
  frontEndNames: string[] = [],
  backEndNames: string[] = [],
  languagesNames: string[] = [],
  hostingServiceNames: string[] = []
) {
  const frontEnd = await getTechnologiesByTitle(frontEndNames);
  const backEnd = await getTechnologiesByTitle(backEndNames);
  const languages = await getTechnologiesByTitle(languagesNames);
  const hostingServices = await getTechnologiesByTitle(hostingServiceNames);
  let error: string | null = null;
  const totalNameLength =
    frontEndNames.length +
    backEndNames.length +
    languagesNames.length +
    hostingServiceNames.length;
  const totalEntitiesLength =
    frontEnd.length +
    backEnd.length +
    languages.length +
    hostingServices.length;
  if (totalNameLength !== totalEntitiesLength) {
    return {
      error: "There might be a typo, some of the technologies does not exist.",
    };
  }

  return { frontEnd, backEnd, languages, hostingServices, error };
}
