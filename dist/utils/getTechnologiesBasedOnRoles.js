"use strict";
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
exports.getTechnologiesBasedOnRoles = void 0;
const TechnologyEntity_1 = require("../entities/TechnologyEntity");
const typeorm_1 = require("typeorm");
const removeDuplicatesFromArray_1 = __importDefault(require("./removeDuplicatesFromArray"));
function getTechnologiesBasedOnRoles(role, entityManager) {
    return __awaiter(this, void 0, void 0, function* () {
        const roleAndSqlMap = {
            language: `SELECT * from technology_entity_language_of_project_entity`,
            front: `SELECT * from technology_entity_front_end_in_project_entity`,
            back: `SELECT * from technology_entity_back_end_in_project_entity`,
            hosting: `SELECT * from technology_entity_hosting_project_entity`,
        };
        const rawLanguageData = yield entityManager.query(roleAndSqlMap[role]);
        const techIds = rawLanguageData.map((data) => data.technologyEntityId);
        const techIdsNoDuplicates = removeDuplicatesFromArray_1.default(techIds);
        const techs = yield TechnologyEntity_1.TechnologyEntity.find({
            where: { id: typeorm_1.In(techIdsNoDuplicates) },
        });
        return techs;
    });
}
exports.getTechnologiesBasedOnRoles = getTechnologiesBasedOnRoles;
//# sourceMappingURL=getTechnologiesBasedOnRoles.js.map