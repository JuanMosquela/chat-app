import * as yup from "yup";

export const registerSchemas = yup.object().shape({
  username: yup
    .string()
    .min(2, "Name too short")
    .max(50, "Name too long")
    .required("This field is requiered"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is requiered"),

  password: yup
    .string()
    .min(6, "Password too short")
    .max(50, "Password too long")
    .required("This field is requiered"),
});
