"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterTechnologiesArray(mainTechnArray, techToBeRemoved) {
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
exports.default = filterTechnologiesArray;
//# sourceMappingURL=filterTechnologiesArray.js.map