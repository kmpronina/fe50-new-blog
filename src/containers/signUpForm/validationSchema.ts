import * as yup from "yup";

export const SignUpValidationSchema = yup.object({
  email: yup.string().required().matches(/(@)/, "invalid email"),
  password: yup.string().min(8, "too short").max(15, "too long").required(),
  username: yup.string().required(),
  course_group: yup.number(),
});

export const ActivateValidationSchema = yup.object({
  userId: yup.string().required(),
  token: yup.string().required(),
});
