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
exports.ErrorField = exports.TechAsSeparateFields = void 0;
const TechnologyEntity_1 = require("../entities/TechnologyEntity");
const decorators_1 = require("type-graphql/dist/decorators");
let TechAsSeparateFields = class TechAsSeparateFields {
};
__decorate([
    decorators_1.Field(() => [TechnologyEntity_1.TechnologyEntity], { nullable: true }),
    __metadata("design:type", Array)
], TechAsSeparateFields.prototype, "front", void 0);
__decorate([
    decorators_1.Field(() => [TechnologyEntity_1.TechnologyEntity], { nullable: true }),
    __metadata("design:type", Array)
], TechAsSeparateFields.prototype, "back", void 0);
__decorate([
    decorators_1.Field(() => [TechnologyEntity_1.TechnologyEntity], { nullable: true }),
    __metadata("design:type", Array)
], TechAsSeparateFields.prototype, "lang", void 0);
__decorate([
    decorators_1.Field(() => [TechnologyEntity_1.TechnologyEntity], { nullable: true }),
    __metadata("design:type", Array)
], TechAsSeparateFields.prototype, "hosting", void 0);
TechAsSeparateFields = __decorate([
    decorators_1.ObjectType()
], TechAsSeparateFields);
exports.TechAsSeparateFields = TechAsSeparateFields;
let ErrorField = class ErrorField {
};
__decorate([
    decorators_1.Field(),
    __metadata("design:type", String)
], ErrorField.prototype, "error", void 0);
__decorate([
    decorators_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ErrorField.prototype, "description", void 0);
ErrorField = __decorate([
    decorators_1.ObjectType()
], ErrorField);
exports.ErrorField = ErrorField;
//# sourceMappingURL=TechnologyResolver.js.map