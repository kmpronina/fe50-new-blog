import * as yup from "yup";

export const signInValidationSchema = yup.object({
  email: yup.string().required().matches(/(@)/, "not matches with '@'"),
  password: yup.string().min(8, "too short").max(15, "too long").required(),
});
