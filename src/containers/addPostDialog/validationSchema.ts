import * as yup from "yup";

export const addPostValidationSchema = yup.object({
  title: yup
    .string()
    .min(2, "too short")
    .max(24, "too long")
    .required()
    .matches(/(a)/, "not matches with 'a'"),
  text: yup.string().min(8, "too short").max(200, "too long").required(),
  image: yup.string().nullable().required(),
});
