import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { createPostFromTMS } from "#api/services/postServices/postServices";
import { AddPostFormikValueType } from "../types";
import ImageSelector from "./ImageSelector";
import { addPostValidationSchema } from "./validationSchema";

interface Props {
  open: boolean;
  onClose: () => void;
}
const AddPostDialog: React.FC<Props> = (props) => {
  const { open, onClose } = props;

  const initialFormikValues: AddPostFormikValueType = {
    title: "",
    text: "",
    image: null,
  };

  const handleSubmit = (formikValues: AddPostFormikValueType) => {
    if (formikValues.image == null) return;
    createPostFromTMS({
      image: formikValues.image,
      text: formikValues.text,
      title: formikValues.title,
      description: formikValues.text,
      lesson_num: 15,
    });
    handleClose();
  };

  const formik = useFormik({
    initialValues: initialFormikValues,
    validationSchema: addPostValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleChangeImage = (newValue: string | null) => {
    formik.setFieldValue("image", newValue);
    formik.setTouched({ ...formik.touched, image: true });
    formik.setErrors({ ...formik.errors });
  };

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const handleDone = () => {
    formik.submitForm();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add some information about your post please</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack sx={{ gap: "10px" }}>
            <ImageSelector
              value={formik.values.image}
              onChange={handleChangeImage}
            />
            <TextField
              name="title"
              value={formik.values.title}
              error={!!formik.errors.title}
              helperText={formik.errors.title}
              label={"Title of your post"}
              onChange={formik.handleChange}
            />
            <TextField
              name="text"
              value={formik.values.text}
              error={!!formik.errors.text}
              helperText={formik.errors.text}
              label={"Description of your post"}
              onChange={formik.handleChange}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>cancel</Button>
        <Button
          disabled={
            !!Object.values(formik.values).filter((value) => !value).length ||
            !!Object.keys(formik.errors).length
          }
          onClick={handleDone}
        >
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostDialog;
