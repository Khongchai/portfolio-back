import { TechnologyEntity } from "src/entities/TechnologyEntity";

//O(n^2)
export default function filterTechnologiesArray(
  mainTechnArray: TechnologyEntity[],
  techToBeRemoved: TechnologyEntity[] | undefined
): TechnologyEntity[] {
  const filteredTechArray = mainTechnArray.filter((tech) => {
    if (techToBeRemoved) {
      for (let i = 0; i < techToBeRemoved.length; i++) {
        if (techToBeRemoved[i].title === tech.title) {
          return false;
        }
      }
    }
    return true;
  });
  return filteredTechArray;
}
