import * as yup from "yup";

export const editPostValidationSchema = yup.object({
  title: yup.string().min(2, "too short").max(24, "too long").required(),
  text: yup.string().min(8, "too short").max(200, "too long").required(),
  image: yup.string().nullable().required(),
  date: yup.string().nullable().required(),
  author: yup.string().nullable().required(),
});
