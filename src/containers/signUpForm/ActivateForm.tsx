import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button, Stack, TextField } from "@mui/material";
import { activation } from "#api/services/authService/authService";
import { RouterLocationsEnum } from "#router/Router";
import useThemeColors from "#hooks/useThemeColors";
import { ActivateDataType } from "./types";
import { ActivateValidationSchema } from "./validationSchema";

const ActivateForm: React.FC = () => {
  const navigation = useNavigate();

  const {
    buttonBgColor,
    buttonTextColor,
    buttonBgHoverColor,
    inputBgColor,
    inputTextColor,
  } = useThemeColors();

  const InitialFormikValues: ActivateDataType = {
    userId: "",
    token: "",
  };

  const handleSubmit = async (formikValues: ActivateDataType) => {
    const { isSuccess } = await activation({
      uid: formikValues.userId,
      token: formikValues.token,
    });

    if (isSuccess) {
      navigation(RouterLocationsEnum.signIn);
    }
  };

  const formik = useFormik({
    initialValues: InitialFormikValues,
    validationSchema: ActivateValidationSchema,
    onSubmit: handleSubmit,
  });

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

  const textfieldStyle = {
    width: "100%",
    backgroundColor: inputBgColor,
    color: "green",
    transition: "0.2s",
    borderRadius: "3px",
    "$:active": {
      color: inputTextColor,
    },
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack
        sx={{
          width: "75%",
          height: "40%",
          borderRadius: "3px",
          padding: "20px",
          gap: "10px",
          alignItems: "center",
          backgroundColor: inputBgColor,
        }}
      >
        <TextField
          name="userId"
          value={formik.values.userId}
          error={!!formik.errors.userId}
          helperText={formik.errors.userId}
          label={"User ID"}
          onChange={formik.handleChange}
          sx={textfieldStyle}
        />
        <TextField
          name="token"
          value={formik.values.token}
          error={!!formik.errors.token}
          helperText={formik.errors.token}
          label={"Token"}
          onChange={formik.handleChange}
          sx={textfieldStyle}
        />

        <Button
          variant="contained"
          sx={buttonStyle}
          disabled={
            !!Object.values(formik.values).filter((value) => !value).length ||
            !!Object.keys(formik.errors).length
          }
          onClick={handleDone}
        >
          activate
        </Button>
      </Stack>
    </form>
  );
};

export default ActivateForm;
