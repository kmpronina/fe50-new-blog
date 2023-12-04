import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Autocomplete,
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
import { editPostFromTMS } from "#api/services/postServices/postServices";
import { EditPostFormikValueType } from "../blog/types";
import ImageSelector from "../../components/imageSelector";
import { editPostValidationSchema } from "./validationSchema";
import useThemeColors from "#hooks/useThemeColors";
import { useAppSelector } from "#store/store";
import { useDispatch } from "react-redux";
import { setEditPostDialogDataFromTMS } from "#store/reducers/blogTMSReducer/actions";

const EditPostDialog: React.FC = () => {
  const { editPostForDialog, authors } = useAppSelector(
    (state) => state.blogTMSReducer
  );

  const dispatch = useDispatch();

  const {
    cardBgColor,
    textColor,
    buttonBgColor,
    buttonTextColor,
    buttonBgHoverColor,
  } = useThemeColors();

  const [isError, setIsError] = useState<string | null>(null);

  const initialFormikValues: EditPostFormikValueType = {
    title: "",
    text: "",
    image: "",
    date: "",
    author: "",
  };

  const handleSubmit = async (formikValues: EditPostFormikValueType) => {
    if (formikValues.image === null) return;
    if (editPostForDialog === null) return;
    const { isSuccess } = await editPostFromTMS({
      image: formikValues.image,
      text: formikValues.text,
      title: formikValues.title,
      description: formikValues.text,
      lesson_num: 15,
      date: formikValues.date,
      author: formikValues.author,
      id: editPostForDialog.id,
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
    validationSchema: editPostValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleChangeImage = (newValue: string | null) => {
    formik.setFieldValue("image", newValue);
    formik.setTouched({ ...formik.touched, image: true });
    formik.setErrors({ ...formik.errors });
  };

  const handleClose = () => {
    formik.resetForm();
    dispatch(setEditPostDialogDataFromTMS(null));
  };

  const handleDone = () => {
    formik.submitForm();
  };

  const handleAuthorAutocompleteChange = (
    e: BaseSyntheticEvent,
    value: string | null
  ) => {
    formik.setFieldValue("author", value);
  };

  useEffect(() => {
    if (editPostForDialog === null) return;

    const { title, text, image, date, author } = editPostForDialog;

    formik.setFieldValue("title", title);
    formik.setFieldValue("text", text);
    formik.setFieldValue("image", image);
    formik.setFieldValue("date", date);
    formik.setFieldValue("author", author);
    formik.setTouched({ ...formik.touched, title: true });
    formik.setTouched({ ...formik.touched, text: true });
    formik.setTouched({ ...formik.touched, image: true });
    formik.setTouched({ ...formik.touched, date: true });
    formik.setTouched({ ...formik.touched, author: true });
  }, [editPostForDialog]);

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
    <Dialog open={!!editPostForDialog} onClose={handleClose}>
      <DialogTitle sx={{ backgroundColor: cardBgColor, color: textColor }}>
        Edit post {editPostForDialog && editPostForDialog.title}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: cardBgColor, color: textColor }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            sx={{
              gap: "15px",
            }}
          >
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
            <TextField
              name="date"
              value={formik.values.date}
              error={!!formik.errors.date}
              helperText={formik.errors.date}
              label={"Date of your post"}
              onChange={formik.handleChange}
            />
            <Autocomplete
              id="author"
              value={formik.values.author}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="author"
                  error={!!formik.errors.author}
                  helperText={formik.errors.author}
                />
              )}
              onChange={handleAuthorAutocompleteChange}
              options={authors}
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

export default EditPostDialog;
