import React, { useState } from "react";
import { useFormik } from "formik";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import useAuth from "#hooks/useAuth";
import useThemeColors from "#hooks/useThemeColors";
import { SingUpDataType } from "./types";
import ActivateForm from "./ActivateForm";
import { SignUpValidationSchema } from "./validationSchema";

const SignUpForm: React.FC = () => {
  const { register } = useAuth();

  const {
    buttonBgColor,
    buttonTextColor,
    buttonBgHoverColor,
    inputBgColor,
    inputTextColor,
  } = useThemeColors();

  const [showSecondStep, setShowSecondStep] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | undefined>(undefined);

  const InitialFormikValues: SingUpDataType = {
    username: "",
    password: "",
    email: "",
    course_group: 2,
  };

  const handleSubmit = async (formikValues: SingUpDataType) => {
    const { isSuccess, error } = await register({
      username: formikValues.username,
      password: formikValues.password,
      email: formikValues.email,
      course_group: formikValues.course_group,
    });

    if (!isSuccess) {
      setLoginError(error);
      return;
    }

    setShowSecondStep(true);
  };

  const formik = useFormik({
    initialValues: InitialFormikValues,
    validationSchema: SignUpValidationSchema,
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        {!showSecondStep ? (
          <Stack
            sx={{
              width: "75%",
              height: "60%",
              borderRadius: "3px",
              padding: "20px",
              gap: "10px",
              alignItems: "center",
              backgroundColor: inputBgColor,
            }}
          >
            <TextField
              name="username"
              value={formik.values.username}
              error={!!formik.errors.username}
              helperText={formik.errors.username}
              label={"Username"}
              onChange={formik.handleChange}
              sx={textfieldStyle}
            />
            <TextField
              name="password"
              value={formik.values.password}
              error={!!formik.errors.password}
              helperText={formik.errors.password}
              label={"Password"}
              onChange={formik.handleChange}
              sx={textfieldStyle}
            />
            <TextField
              name="email"
              value={formik.values.email}
              error={!!formik.errors.email}
              helperText={formik.errors.email}
              label={"Email"}
              onChange={formik.handleChange}
              sx={textfieldStyle}
            />
            <TextField
              name="group"
              value={formik.values.course_group}
              error={!!formik.errors.course_group}
              helperText={formik.errors.course_group}
              label={"Group"}
              onChange={formik.handleChange}
              sx={textfieldStyle}
            />
            {loginError && (
              <Typography style={{ color: "#f00" }}>{loginError}</Typography>
            )}
            <Button
              variant="contained"
              sx={buttonStyle}
              disabled={
                !!Object.values(formik.values).filter((value) => !value)
                  .length || !!Object.keys(formik.errors).length
              }
              onClick={handleDone}
            >
              sign up
            </Button>
          </Stack>
        ) : (
          <ActivateForm />
        )}
      </Box>
    </form>
  );
};
export default SignUpForm;
