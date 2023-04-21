import { check } from "express-validator";

const googleValidator = [
  check("id_token", "You need to have a valid id token").notEmpty(),
];

export default googleValidator;
