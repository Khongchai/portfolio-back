import { TechnologyEntity } from "../entities/TechnologyEntity";
import { EntityManager, In } from "typeorm";
import removeDuplicatesFromArray from "./removeDuplicatesFromArray";

export async function getTechnologiesBasedOnRoles(
  role: "language" | "front" | "back" | "hosting",
  entityManager: EntityManager
): Promise<TechnologyEntity[]> {
  const roleAndSqlMap = {
    language: `SELECT * from technology_entity_language_of_project_entity`,
    front: `SELECT * from technology_entity_front_end_in_project_entity`,
    back: `SELECT * from technology_entity_back_end_in_project_entity`,
    hosting: `SELECT * from technology_entity_hosting_project_entity`,
  };
  const rawLanguageData: [
    { technologyEntityId: number; projectEntityId: number }
  ] = await entityManager.query(roleAndSqlMap[role]);
  const techIds = rawLanguageData.map((data) => data.technologyEntityId);
  const techIdsNoDuplicates = removeDuplicatesFromArray(techIds);
  const techs = await TechnologyEntity.find({
    where: { id: In(techIdsNoDuplicates) },
  });

  return techs;
}
