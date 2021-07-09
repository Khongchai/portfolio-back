import { isAuth } from "../middleware/isAuth";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { ProjectEntity } from "../entities/ProjectEntity";
import { TechnologyEntity } from "../entities/TechnologyEntity";
import {
  AddTechInput,
  PaginatedProjects,
  ProjectCreationInput,
  ProjResponse,
} from "../inputAndObjectTypes/ProjectResolver";
import { Context } from "../types";
import filterTechnologiesArray from "../utils/filterTechnologiesArray";
import { getTechListForEachProp } from "../utils/getTechnologiesByTitle";

@InputType()
class PaginatedProjectsInput {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  skip: number;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field({ nullable: true })
  order?: "ASC" | "DESC";

  @Field({ nullable: true })
  sortBy?: "Title" | "Date";

  @Field({ nullable: true })
  getAll?: boolean;
}

@Resolver()
export class ProjectsResolver {
  @Query(() => PaginatedProjects)
  async projects(
    @Arg("input") input: PaginatedProjectsInput
  ): Promise<PaginatedProjects> {
    let { limit, skip, order, search, sortBy, getAll } = input;
    let realLimit = 0;
    let realLimitPlusOne = 0;

    if (getAll) {
      //Skip = 0 sets isFirst to true
      //realLimit = 99999 fetches all proj
      //RealLimitPlusOne = 99999 gets all sets isLast to true
      skip = 0;
      realLimit = 99999;
      realLimitPlusOne = 99999;
    } else {
      realLimit = Math.min(5, limit);
      realLimitPlusOne = realLimit + 1;
    }
    const searchLowerCase = search ? `%${search.toLowerCase()}%` : "%";

    let returnedEntity: any;
    returnedEntity = getConnection()
      .createQueryBuilder()
      .select("project")
      .from(ProjectEntity, "project")
      .leftJoinAndSelect("project.frontEndTechnologies", "frontEndTechnologies")
      .leftJoinAndSelect("project.backEndTechnologies", "backEndTechnologies")
      .leftJoinAndSelect("project.languages", "languages")
      .leftJoinAndSelect("project.hostingServices", "hostingServices")
      .take(realLimitPlusOne)
      .skip(skip);

    returnedEntity = returnedEntity.where(
      `LOWER(backEndTechnologies.title) like :searchLowerCase OR 
      LOWER(frontEndTechnologies.title) like :searchLowerCase OR 
      LOWER(languages.title) like :searchLowerCase OR 
      LOWER(hostingServices.title) like :searchLowerCase OR 
      LOWER(project.title) like :searchLowerCase OR
      LOWER(project.shortDescription) like :searchLowerCase`,
      {
        searchLowerCase,
      }
    );

    if (sortBy === "Date") {
      returnedEntity.orderBy("project.startDate", order);
    } else {
      returnedEntity.orderBy("project.title", order);
    }
    returnedEntity = await returnedEntity.getMany();

    const isFirstQuery = skip === 0;
    const isLastQuery = returnedEntity.length < realLimitPlusOne;

    const returnProjects = {
      projects: returnedEntity.slice(0, realLimit),
      isFirstQuery,
      isLastQuery,
    };

    return returnProjects;
  }

  @Query(() => [ProjectEntity])
  async allProjectsNotPaginated(): Promise<ProjectEntity[]> {
    const allProjects = await ProjectEntity.find({
      relations: [
        "frontEndTechnologies",
        "backEndTechnologies",
        "languages",
        "hostingServices",
      ],
    });
    return allProjects;
  }

  /*
    Current use case for loading previously//cached selection,
    prioritizing the data for snappy first load. 
  */
  @Query(() => ProjResponse)
  async getSingleProjectByTitle(
    @Arg("title", () => String) title: string
  ): Promise<ProjResponse | undefined> {
    const project = await ProjectEntity.findOne({
      where: { title },
      relations: [
        "frontEndTechnologies",
        "backEndTechnologies",
        "languages",
        "hostingServices",
      ],
    });

    if (!project) {
      return {
        errors: [
          {
            message: `Project with name ${title} does not exist`,
          },
        ],
      };
    }
    return { proj: project };
  }

  @Query(() => [ProjectEntity])
  async getHighlightedProjects(): Promise<ProjectEntity[] | undefined> {
    const highlightedProjects = await ProjectEntity.find({
      where: { isHighlight: true },
      relations: [
        "frontEndTechnologies",
        "backEndTechnologies",
        "languages",
        "hostingServices",
      ],
    });
    return highlightedProjects;
  }

  @Mutation(() => ProjResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async createProject(
    @Arg("projectData") projectData: ProjectCreationInput,
    @Ctx() {}: Context
  ): Promise<ProjResponse | null | boolean> {
    const {
      description,
      endDate,
      startDate,
      title,
      isHighlight,
      shortDescription,
      githubLink,
      websiteLink,
    } = projectData;
    const { frontEndNames, backEndNames, languagesNames, hostingServiceNames } =
      projectData.techProps;

    const { backEnd, frontEnd, languages, hostingServices, error } =
      await getTechListForEachProp(
        frontEndNames,
        backEndNames,
        languagesNames,
        hostingServiceNames
      );

    if (error)
      return {
        errors: [
          {
            message: error,
          },
        ],
      };

    const newProj = await ProjectEntity.create({
      description,
      endDate,
      title,
      startDate,
      frontEndTechnologies: frontEnd,
      backEndTechnologies: backEnd,
      hostingServices: hostingServices,
      languages,
      isHighlight: isHighlight || false,
      shortDescription,
      githubLink,
      websiteLink,
    }).save();

    return { proj: newProj };
  }

  @Mutation(() => ProjResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async addOrRemoveTechnologies(
    @Arg("projectData") input: AddTechInput,
    @Arg("operation") operation: boolean
  ): Promise<ProjResponse> {
    const { projTitle } = input;
    const { backEndNames, frontEndNames, hostingServiceNames, languagesNames } =
      input.techProps;

    const proj = await ProjectEntity.findOne({
      where: { title: projTitle },
      relations: [
        "frontEndTechnologies",
        "backEndTechnologies",
        "languages",
        "hostingServices",
      ],
    });

    if (!proj) {
      return {
        errors: [
          {
            message: "No projects found",
          },
        ],
      };
    }

    const { backEnd, frontEnd, languages, hostingServices, error } =
      await getTechListForEachProp(
        frontEndNames,
        backEndNames,
        languagesNames,
        hostingServiceNames
      );
    if (error)
      return {
        errors: [
          {
            message: error,
          },
        ],
      };

    if (operation) {
      proj.backEndTechnologies = [
        ...proj.backEndTechnologies,
        ...(backEnd as TechnologyEntity[]),
      ];
      proj.frontEndTechnologies = [
        ...proj.frontEndTechnologies,
        ...(frontEnd as TechnologyEntity[]),
      ];
      proj.languages = [
        ...proj.languages,
        ...(languages as TechnologyEntity[]),
      ];
      proj.hostingServices = [
        ...proj.hostingServices,
        ...(hostingServices as TechnologyEntity[]),
      ];
    } else {
      proj.backEndTechnologies = filterTechnologiesArray(
        proj.backEndTechnologies,
        backEnd
      );
      proj.frontEndTechnologies = filterTechnologiesArray(
        proj.frontEndTechnologies,
        frontEnd
      );
      proj.hostingServices = filterTechnologiesArray(
        proj.hostingServices,
        hostingServices
      );
      proj.languages = filterTechnologiesArray(proj.languages, languages);
    }

    await proj.save();

    return { proj };
  }

  @Mutation(() => ProjResponse)
  @UseMiddleware(isAuth)
  async setProjectHighlight(
    @Arg("title") title: string,
    @Arg("operation") operation: boolean
  ): Promise<ProjResponse> {
    const project = await ProjectEntity.findOne({ where: { title } });
    if (project) {
      project.isHighlight = operation;
      await project.save();
      return { proj: project };
    }
    return { errors: [{ message: "Project not found" }] };
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async deleteAllProjects(): Promise<string> {
    const projectsToBeDeleted = await ProjectEntity.find({});
    if (projectsToBeDeleted.length === 0) {
      return "No more projects left to delete.";
    } else {
      await ProjectEntity.remove(projectsToBeDeleted);
      return "All projects deleted successfully.";
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteProject(@Arg("id") id: number): Promise<boolean> {
    const projectToBeDeleted = await ProjectEntity.findOne({ id });
    if (!projectToBeDeleted) {
      return false;
    } else {
      await projectToBeDeleted.remove();
      return true;
    }
  }
}
