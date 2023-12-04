import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createPostFromTMS } from "#api/services/postServices/postServices";
import { AddPostFormikValueType } from "../blog/types";
import ImageSelector from "../../components/imageSelector";
import { addPostValidationSchema } from "./validationSchema";
import useThemeColors from "#hooks/useThemeColors";

interface Props {
  open: boolean;
  onClose: () => void;
}
const AddPostDialog: React.FC<Props> = (props) => {
  const { open, onClose } = props;

  const {
    cardBgColor,
    textColor,
    buttonBgColor,
    buttonTextColor,
    buttonBgHoverColor,
  } = useThemeColors();

  const [isError, setIsError] = useState<string | null>(null);

  const initialFormikValues: AddPostFormikValueType = {
    title: "",
    text: "",
    image: null,
  };

  const handleSubmit = async (formikValues: AddPostFormikValueType) => {
    if (formikValues.image == null) return;
    const { isSuccess } = await createPostFromTMS({
      image: formikValues.image,
      text: formikValues.text,
      title: formikValues.title,
      description: formikValues.text,
      lesson_num: 15,
    });
    if (!isSuccess) {
      setIsError("server error");
      setTimeout(() => {
        setIsError(null);
      }, 5000);
      return;
    }
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

  const buttonStyle = {
    backgroundColor: buttonBgColor,
    color: buttonTextColor,
    transition: "0.2s",
    marginLeft: "15px",
    width: "125px",
    "&:hover": {
      backgroundColor: buttonBgHoverColor,
    },
    ":disabled": {
      backgroundColor: buttonBgHoverColor,
    },
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ backgroundColor: cardBgColor, color: textColor }}>
        Add some information about your post please
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: cardBgColor, color: textColor }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            sx={{
              gap: "15px",
            }}
          >
            {/* <RandomImageSelector
              value={formik.values.image}
              onChange={handleChangeImage}
            /> */}
            <ImageSelector
              image={formik.values.image}
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
      <DialogActions sx={{ backgroundColor: cardBgColor, color: textColor }}>
        <Stack>
          {isError !== null && (
            <Typography sx={{ color: "red" }}>{isError}</Typography>
          )}
          <Box>
            <Button variant="contained" onClick={handleClose} sx={buttonStyle}>
              cancel
            </Button>
            <Button
              variant="contained"
              disabled={
                !!Object.values(formik.values).filter((value) => !value)
                  .length || !!Object.keys(formik.errors).length
              }
              onClick={handleDone}
              sx={buttonStyle}
            >
              save
            </Button>
          </Box>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostDialog;
