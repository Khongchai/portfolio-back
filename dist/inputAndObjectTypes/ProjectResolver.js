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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedProjects = exports.ProjResponse = exports.ErrorField = exports.AddTechInput = exports.ProjectCreationInput = void 0;
const ProjectEntity_1 = require("../entities/ProjectEntity");
const type_graphql_1 = require("type-graphql");
let TechnologyProperties = class TechnologyProperties {
};
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], TechnologyProperties.prototype, "frontEndNames", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], TechnologyProperties.prototype, "backEndNames", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], TechnologyProperties.prototype, "languagesNames", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], TechnologyProperties.prototype, "hostingServiceNames", void 0);
TechnologyProperties = __decorate([
    type_graphql_1.InputType()
], TechnologyProperties);
let ProjectCreationInput = class ProjectCreationInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectCreationInput.prototype, "startDate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ProjectCreationInput.prototype, "endDate", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectCreationInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectCreationInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectCreationInput.prototype, "shortDescription", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectCreationInput.prototype, "githubLink", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ProjectCreationInput.prototype, "websiteLink", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ProjectCreationInput.prototype, "imgLink", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ProjectCreationInput.prototype, "tinyImgLink", void 0);
__decorate([
    type_graphql_1.Field(() => TechnologyProperties, { nullable: true }),
    __metadata("design:type", TechnologyProperties)
], ProjectCreationInput.prototype, "techProps", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ProjectCreationInput.prototype, "isHighlight", void 0);
ProjectCreationInput = __decorate([
    type_graphql_1.InputType()
], ProjectCreationInput);
exports.ProjectCreationInput = ProjectCreationInput;
let AddTechInput = class AddTechInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddTechInput.prototype, "projTitle", void 0);
__decorate([
    type_graphql_1.Field(() => TechnologyProperties, { nullable: true }),
    __metadata("design:type", TechnologyProperties)
], AddTechInput.prototype, "techProps", void 0);
AddTechInput = __decorate([
    type_graphql_1.InputType()
], AddTechInput);
exports.AddTechInput = AddTechInput;
let ErrorField = class ErrorField {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ErrorField.prototype, "message", void 0);
ErrorField = __decorate([
    type_graphql_1.ObjectType()
], ErrorField);
exports.ErrorField = ErrorField;
let ProjResponse = class ProjResponse {
};
__decorate([
    type_graphql_1.Field(() => [ErrorField], { nullable: true }),
    __metadata("design:type", Array)
], ProjResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => ProjectEntity_1.ProjectEntity, { nullable: true }),
    __metadata("design:type", ProjectEntity_1.ProjectEntity)
], ProjResponse.prototype, "proj", void 0);
ProjResponse = __decorate([
    type_graphql_1.ObjectType()
], ProjResponse);
exports.ProjResponse = ProjResponse;
let PaginatedProjects = class PaginatedProjects {
};
__decorate([
    type_graphql_1.Field(() => [ProjectEntity_1.ProjectEntity]),
    __metadata("design:type", Array)
], PaginatedProjects.prototype, "projects", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], PaginatedProjects.prototype, "isFirstQuery", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], PaginatedProjects.prototype, "isLastQuery", void 0);
PaginatedProjects = __decorate([
    type_graphql_1.ObjectType()
], PaginatedProjects);
exports.PaginatedProjects = PaginatedProjects;
//# sourceMappingURL=ProjectResolver.js.map