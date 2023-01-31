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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologyResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const TechnologyEntity_1 = require("../entities/TechnologyEntity");
const TechnologyResolver_1 = require("../inputAndObjectTypes/TechnologyResolver");
const getTechnologiesBasedOnRoles_1 = require("../utils/getTechnologiesBasedOnRoles");
let TechnologyResolver = class TechnologyResolver {
    technologies() {
        return __awaiter(this, void 0, void 0, function* () {
            const technologies = yield TechnologyEntity_1.TechnologyEntity.find({
                relations: ["frontEndIn", "backEndIn", "languageOf", "hosting"],
            });
            return technologies;
        });
    }
    getTechnologiesAssignedToRole() {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = typeorm_1.getManager();
            const languages = yield getTechnologiesBasedOnRoles_1.getTechnologiesBasedOnRoles("language", entityManager);
            const frontends = yield getTechnologiesBasedOnRoles_1.getTechnologiesBasedOnRoles("front", entityManager);
            const backends = yield getTechnologiesBasedOnRoles_1.getTechnologiesBasedOnRoles("back", entityManager);
            const hostingServices = yield getTechnologiesBasedOnRoles_1.getTechnologiesBasedOnRoles("hosting", entityManager);
            return {
                front: frontends,
                back: backends,
                lang: languages,
                hosting: hostingServices,
            };
        });
    }
    createTechnology(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const tech = yield TechnologyEntity_1.TechnologyEntity.create({
                title: title,
            }).save();
            return tech;
        });
    }
    deleteAllTechnologies({}) {
        return __awaiter(this, void 0, void 0, function* () {
            const techToBeDeleted = yield TechnologyEntity_1.TechnologyEntity.find({});
            if (techToBeDeleted.length === 0) {
                return "No more technologies left to delete.";
            }
            else {
                yield TechnologyEntity_1.TechnologyEntity.remove(techToBeDeleted);
                return "All technologies deleted successfully.";
            }
        });
    }
    deleteTechnolgy(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const techToBeDeleted = yield TechnologyEntity_1.TechnologyEntity.findOne({
                where: { title },
            });
            if (!techToBeDeleted) {
                return `Technology ${title} does not exist.`;
            }
            else {
                yield TechnologyEntity_1.TechnologyEntity.remove(techToBeDeleted);
                return "Technology deleted successfully.";
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [TechnologyEntity_1.TechnologyEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TechnologyResolver.prototype, "technologies", null);
__decorate([
    type_graphql_1.Query(() => TechnologyResolver_1.TechAsSeparateFields),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TechnologyResolver.prototype, "getTechnologiesAssignedToRole", null);
__decorate([
    type_graphql_1.Mutation(() => TechnologyEntity_1.TechnologyEntity, { nullable: true }),
    __param(0, type_graphql_1.Arg("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TechnologyResolver.prototype, "createTechnology", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TechnologyResolver.prototype, "deleteAllTechnologies", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TechnologyResolver.prototype, "deleteTechnolgy", null);
TechnologyResolver = __decorate([
    type_graphql_1.Resolver()
], TechnologyResolver);
exports.TechnologyResolver = TechnologyResolver;
//# sourceMappingURL=TechnologyResolver.js.map