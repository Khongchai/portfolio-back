"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeDuplicatesFromArray(array) {
    let arrayFiltered = [];
    const arrayLength = array.length;
    for (let i = 0; i < arrayLength; i++) {
        if (!arrayFiltered.includes(array[i])) {
            arrayFiltered.push(array[i]);
        }
    }
    return arrayFiltered;
}
exports.default = removeDuplicatesFromArray;
//# sourceMappingURL=removeDuplicatesFromArray.js.map