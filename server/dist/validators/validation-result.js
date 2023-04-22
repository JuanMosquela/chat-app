"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationGeneral = void 0;
const express_validator_1 = require("express-validator");
const validationGeneral = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), valid: false });
    }
    next();
};
exports.validationGeneral = validationGeneral;
