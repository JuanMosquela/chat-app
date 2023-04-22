"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.genericRouter = router;
const auth_route_1 = __importDefault(require("./auth.route"));
router.use("/auth", auth_route_1.default);
