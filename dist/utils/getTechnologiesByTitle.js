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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTechListForEachProp = exports.getTechnologiesByTitle = void 0;
const TechnologyEntity_1 = require("../entities/TechnologyEntity");
const typeorm_1 = require("typeorm");
function getTechnologiesByTitle(titles) {
    return __awaiter(this, void 0, void 0, function* () {
        if (titles.length > 0) {
            return yield typeorm_1.getManager()
                .createQueryBuilder(TechnologyEntity_1.TechnologyEntity, "tech")
                .where("tech.title IN (:...titles)", { titles })
                .orderBy("tech.title")
                .getMany();
        }
        return [];
    });
}
exports.getTechnologiesByTitle = getTechnologiesByTitle;
function getTechListForEachProp(frontEndNames = [], backEndNames = [], languagesNames = [], hostingServiceNames = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const frontEnd = yield getTechnologiesByTitle(frontEndNames);
        const backEnd = yield getTechnologiesByTitle(backEndNames);
        const languages = yield getTechnologiesByTitle(languagesNames);
        const hostingServices = yield getTechnologiesByTitle(hostingServiceNames);
        let error = null;
        const totalNameLength = frontEndNames.length +
            backEndNames.length +
            languagesNames.length +
            hostingServiceNames.length;
        const totalEntitiesLength = frontEnd.length +
            backEnd.length +
            languages.length +
            hostingServices.length;
        if (totalNameLength !== totalEntitiesLength) {
            return {
                error: "There might be a typo, some of the technologies does not exist.",
            };
        }
        return { frontEnd, backEnd, languages, hostingServices, error };
    });
}
exports.getTechListForEachProp = getTechListForEachProp;
//# sourceMappingURL=getTechnologiesByTitle.js.map