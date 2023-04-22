"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const googleValidator = [
    (0, express_validator_1.check)("id_token", "You need to have a valid id token").notEmpty(),
];
exports.default = googleValidator;
