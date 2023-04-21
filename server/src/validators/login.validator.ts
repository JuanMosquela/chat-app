import { body } from "express-validator";

const loginValidator = [
  body("identifier").custom((value, { req }) => {
    if (!value) {
      throw new Error("El nombre de usuario o correo electrónico es requerido");
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) &&
      !/^\w+$/.test(value)
    ) {
      throw new Error("El nombre de usuario o correo electrónico no es válido");
    }
    return true;
  }),
  body("password").isLength({ min: 8 }),
];

export default loginValidator;
