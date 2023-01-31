"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroySession = void 0;
const constants_1 = require("../constants");
const destroySession = ({ req, res }) => {
    return new Promise((resolve) => req.session.destroy((err) => {
        res.clearCookie(constants_1.COOKIE_NAME);
        if (err) {
            console.log("Logout error: ", err);
            resolve(false);
        }
        resolve(true);
    }));
};
exports.destroySession = destroySession;
//# sourceMappingURL=destroySession.js.map