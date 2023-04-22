"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const registerValidator = [
    (0, express_validator_1.check)("username").notEmpty().isLength({ min: 2 }),
    (0, express_validator_1.check)("email").isEmail(),
    (0, express_validator_1.check)("password").notEmpty().isLength({ min: 8 }),
];
exports.default = registerValidator;
