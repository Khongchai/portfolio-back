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
exports.TechnologyEntity = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const ProjectEntity_1 = require("./ProjectEntity");
let TechnologyEntity = class TechnologyEntity extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TechnologyEntity.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], TechnologyEntity.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => [ProjectEntity_1.ProjectEntity], { nullable: true }),
    typeorm_1.ManyToMany(() => ProjectEntity_1.ProjectEntity, (proj) => proj.frontEndTechnologies, {
        cascade: true,
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], TechnologyEntity.prototype, "frontEndIn", void 0);
__decorate([
    type_graphql_1.Field(() => [ProjectEntity_1.ProjectEntity], { nullable: true }),
    typeorm_1.ManyToMany(() => ProjectEntity_1.ProjectEntity, (proj) => proj.backEndTechnologies, {
        cascade: true,
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], TechnologyEntity.prototype, "backEndIn", void 0);
__decorate([
    type_graphql_1.Field(() => [ProjectEntity_1.ProjectEntity], { nullable: true }),
    typeorm_1.ManyToMany(() => ProjectEntity_1.ProjectEntity, (proj) => proj.languages, {
        cascade: true,
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], TechnologyEntity.prototype, "languageOf", void 0);
__decorate([
    type_graphql_1.Field(() => [ProjectEntity_1.ProjectEntity], { nullable: true }),
    typeorm_1.ManyToMany(() => ProjectEntity_1.ProjectEntity, (proj) => proj.hostingServices, {
        cascade: true,
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], TechnologyEntity.prototype, "hosting", void 0);
TechnologyEntity = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], TechnologyEntity);
exports.TechnologyEntity = TechnologyEntity;
//# sourceMappingURL=TechnologyEntity.js.map