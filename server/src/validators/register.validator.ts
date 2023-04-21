import { body, check } from "express-validator";

const registerValidator = [
  check("username").notEmpty().isLength({ min: 2 }),
  check("email").isEmail(),
  check("password").notEmpty().isLength({ min: 8 }),
];

export default registerValidator;
