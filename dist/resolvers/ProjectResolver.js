"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ProjectEntity_1 = require("../entities/ProjectEntity");
const ProjectResolver_1 = require("../inputAndObjectTypes/ProjectResolver");
const filterTechnologiesArray_1 = __importDefault(require("../utils/filterTechnologiesArray"));
const getTechnologiesByTitle_1 = require("../utils/getTechnologiesByTitle");
let PaginatedProjectsInput = class PaginatedProjectsInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], PaginatedProjectsInput.prototype, "limit", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], PaginatedProjectsInput.prototype, "skip", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], PaginatedProjectsInput.prototype, "search", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], PaginatedProjectsInput.prototype, "order", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], PaginatedProjectsInput.prototype, "sortBy", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], PaginatedProjectsInput.prototype, "getAll", void 0);
PaginatedProjectsInput = __decorate([
    type_graphql_1.InputType()
], PaginatedProjectsInput);
let ProjectsResolver = class ProjectsResolver {
    projects(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let { limit, skip, order, search, sortBy, getAll } = input;
            let realLimit = 0;
            let realLimitPlusOne = 0;
            if (getAll) {
                skip = 0;
                realLimit = 99999;
                realLimitPlusOne = 99999;
            }
            else {
                realLimit = Math.min(8, limit);
                realLimitPlusOne = realLimit + 1;
            }
            const searchLowerCase = search ? `%${search.toLowerCase()}%` : "%";
            let returnedEntity;
            returnedEntity = typeorm_1.getConnection()
                .createQueryBuilder()
                .select("project")
                .from(ProjectEntity_1.ProjectEntity, "project")
                .leftJoinAndSelect("project.frontEndTechnologies", "frontEndTechnologies")
                .leftJoinAndSelect("project.backEndTechnologies", "backEndTechnologies")
                .leftJoinAndSelect("project.languages", "languages")
                .leftJoinAndSelect("project.hostingServices", "hostingServices")
                .take(realLimitPlusOne)
                .skip(skip);
            returnedEntity = returnedEntity.where(`LOWER(backEndTechnologies.title) like :searchLowerCase OR 
      LOWER(frontEndTechnologies.title) like :searchLowerCase OR 
      LOWER(languages.title) like :searchLowerCase OR 
      LOWER(hostingServices.title) like :searchLowerCase OR 
      LOWER(project.title) like :searchLowerCase OR
      LOWER(project.shortDescription) like :searchLowerCase`, {
                searchLowerCase,
            });
            if (sortBy === "Date") {
                returnedEntity.orderBy("project.startDate", order);
            }
            else {
                returnedEntity.orderBy("project.title", order);
            }
            returnedEntity = yield returnedEntity.getMany();
            const isFirstQuery = skip === 0;
            const isLastQuery = returnedEntity.length < realLimitPlusOne;
            const returnProjects = {
                projects: returnedEntity.slice(0, realLimit),
                isFirstQuery,
                isLastQuery,
            };
            return returnProjects;
        });
    }
    allProjectsNotPaginated() {
        return __awaiter(this, void 0, void 0, function* () {
            const allProjects = yield ProjectEntity_1.ProjectEntity.find({
                relations: [
                    "frontEndTechnologies",
                    "backEndTechnologies",
                    "languages",
                    "hostingServices",
                ],
            });
            return allProjects;
        });
    }
    getSingleProjectByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield ProjectEntity_1.ProjectEntity.findOne({
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
        });
    }
    getHighlightedProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const highlightedProjects = yield ProjectEntity_1.ProjectEntity.find({
                where: { isHighlight: true },
                relations: [
                    "frontEndTechnologies",
                    "backEndTechnologies",
                    "languages",
                    "hostingServices",
                ],
            });
            return highlightedProjects;
        });
    }
    createProject(projectData, {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, endDate, startDate, title, isHighlight, shortDescription, githubLink, websiteLink, } = projectData;
            const { frontEndNames, backEndNames, languagesNames, hostingServiceNames } = projectData.techProps;
            const { backEnd, frontEnd, languages, hostingServices, error } = yield getTechnologiesByTitle_1.getTechListForEachProp(frontEndNames, backEndNames, languagesNames, hostingServiceNames);
            if (error)
                return {
                    errors: [
                        {
                            message: error,
                        },
                    ],
                };
            const newProj = yield ProjectEntity_1.ProjectEntity.create({
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
        });
    }
    addOrRemoveTechnologies(input, operation) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projTitle } = input;
            const { backEndNames, frontEndNames, hostingServiceNames, languagesNames } = input.techProps;
            const proj = yield ProjectEntity_1.ProjectEntity.findOne({
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
            const { backEnd, frontEnd, languages, hostingServices, error } = yield getTechnologiesByTitle_1.getTechListForEachProp(frontEndNames, backEndNames, languagesNames, hostingServiceNames);
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
                    ...backEnd,
                ];
                proj.frontEndTechnologies = [
                    ...proj.frontEndTechnologies,
                    ...frontEnd,
                ];
                proj.languages = [
                    ...proj.languages,
                    ...languages,
                ];
                proj.hostingServices = [
                    ...proj.hostingServices,
                    ...hostingServices,
                ];
            }
            else {
                proj.backEndTechnologies = filterTechnologiesArray_1.default(proj.backEndTechnologies, backEnd);
                proj.frontEndTechnologies = filterTechnologiesArray_1.default(proj.frontEndTechnologies, frontEnd);
                proj.hostingServices = filterTechnologiesArray_1.default(proj.hostingServices, hostingServices);
                proj.languages = filterTechnologiesArray_1.default(proj.languages, languages);
            }
            yield proj.save();
            return { proj };
        });
    }
    setProjectHighlight(title, operation) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield ProjectEntity_1.ProjectEntity.findOne({ where: { title } });
            if (project) {
                project.isHighlight = operation;
                yield project.save();
                return { proj: project };
            }
            return { errors: [{ message: "Project not found" }] };
        });
    }
    deleteAllProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectsToBeDeleted = yield ProjectEntity_1.ProjectEntity.find({});
            if (projectsToBeDeleted.length === 0) {
                return "No more projects left to delete.";
            }
            else {
                yield ProjectEntity_1.ProjectEntity.remove(projectsToBeDeleted);
                return "All projects deleted successfully.";
            }
        });
    }
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectToBeDeleted = yield ProjectEntity_1.ProjectEntity.findOne({ id });
            if (!projectToBeDeleted) {
                return false;
            }
            else {
                yield projectToBeDeleted.remove();
                return true;
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => ProjectResolver_1.PaginatedProjects),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PaginatedProjectsInput]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "projects", null);
__decorate([
    type_graphql_1.Query(() => [ProjectEntity_1.ProjectEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "allProjectsNotPaginated", null);
__decorate([
    type_graphql_1.Query(() => ProjectResolver_1.ProjResponse),
    __param(0, type_graphql_1.Arg("title", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "getSingleProjectByTitle", null);
__decorate([
    type_graphql_1.Query(() => [ProjectEntity_1.ProjectEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "getHighlightedProjects", null);
__decorate([
    type_graphql_1.Mutation(() => ProjectResolver_1.ProjResponse, { nullable: true }),
    __param(0, type_graphql_1.Arg("projectData")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProjectResolver_1.ProjectCreationInput, Object]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "createProject", null);
__decorate([
    type_graphql_1.Mutation(() => ProjectResolver_1.ProjResponse, { nullable: true }),
    __param(0, type_graphql_1.Arg("projectData")),
    __param(1, type_graphql_1.Arg("operation")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProjectResolver_1.AddTechInput, Boolean]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "addOrRemoveTechnologies", null);
__decorate([
    type_graphql_1.Mutation(() => ProjectResolver_1.ProjResponse),
    __param(0, type_graphql_1.Arg("title")),
    __param(1, type_graphql_1.Arg("operation")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "setProjectHighlight", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "deleteAllProjects", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "deleteProject", null);
ProjectsResolver = __decorate([
    type_graphql_1.Resolver()
], ProjectsResolver);
exports.ProjectsResolver = ProjectsResolver;
//# sourceMappingURL=ProjectResolver.js.map