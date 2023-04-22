"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const loginValidator = [
    (0, express_validator_1.body)("identifier").custom((value, { req }) => {
        if (!value) {
            throw new Error("El nombre de usuario o correo electrónico es requerido");
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) &&
            !/^\w+$/.test(value)) {
            throw new Error("El nombre de usuario o correo electrónico no es válido");
        }
        return true;
    }),
    (0, express_validator_1.body)("password").isLength({ min: 8 }),
];
exports.default = loginValidator;
