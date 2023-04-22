"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const login_validator_1 = __importDefault(require("../validators/login.validator"));
const validation_result_1 = require("../validators/validation-result");
const google_validator_1 = __importDefault(require("../validators/google.validator"));
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.register);
router.post("/login", login_validator_1.default, validation_result_1.validationGeneral, auth_controller_1.login);
router.post("/google", google_validator_1.default, validation_result_1.validationGeneral, auth_controller_1.googleLogin);
exports.default = router;
