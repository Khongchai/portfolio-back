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
exports.ProjectEntity = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const TechnologyEntity_1 = require("./TechnologyEntity");
let ProjectEntity = class ProjectEntity extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProjectEntity.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "shortDescription", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "githubLink", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "websiteLink", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "imgLink", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "tinyImgLink", void 0);
__decorate([
    type_graphql_1.Field(() => [TechnologyEntity_1.TechnologyEntity], { nullable: true }),
    typeorm_1.ManyToMany(() => TechnologyEntity_1.TechnologyEntity, (tech) => tech.frontEndIn),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "frontEndTechnologies", void 0);
__decorate([
    type_graphql_1.Field(() => [TechnologyEntity_1.TechnologyEntity], { nullable: true }),
    typeorm_1.ManyToMany(() => TechnologyEntity_1.TechnologyEntity, (tech) => tech.backEndIn),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "backEndTechnologies", void 0);
__decorate([
    type_graphql_1.Field(() => [TechnologyEntity_1.TechnologyEntity], { nullable: true }),
    typeorm_1.ManyToMany(() => TechnologyEntity_1.TechnologyEntity, (tech) => tech.languageOf),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "languages", void 0);
__decorate([
    type_graphql_1.Field(() => [TechnologyEntity_1.TechnologyEntity], { nullable: true }),
    typeorm_1.ManyToMany(() => TechnologyEntity_1.TechnologyEntity, (tech) => tech.hosting),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "hostingServices", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "startDate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "endDate", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], ProjectEntity.prototype, "isHighlight", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "heroImgLink", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "playStoreLink", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "appStoreLink", void 0);
ProjectEntity = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], ProjectEntity);
exports.ProjectEntity = ProjectEntity;
//# sourceMappingURL=ProjectEntity.js.map