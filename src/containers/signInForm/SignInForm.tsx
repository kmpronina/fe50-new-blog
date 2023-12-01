import React, { BaseSyntheticEvent, useState } from "react";
import { useFormik } from "formik";
import { Box, TextField, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "#store/store";
import { RouterLocationsEnum } from "#router/Router";
import {
  LoginFailureReturnType,
  LoginReturnType,
  LoginSuccessReturnType,
} from "#api/services/authService/types";
import { login } from "#api/services/authService/authService";
import { setLocalStorageWithTime } from "#utils/addTimeToExpireToStorage";
import {
  setAccessTokenToStore,
  setUserDataToStore,
} from "#store/reducers/userReducer/actions";
import { signInValidationSchema } from "./singInValidationSchema";
import { SignInDataType } from "./types";
import useThemeColors from "#hooks/useThemeColors";

const isLoginFailure = (
  loginData: LoginReturnType
): loginData is LoginFailureReturnType => {
  if ((loginData as LoginFailureReturnType)?.detail) {
    return true;
  }

  return false;
};

const SignInForm: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const {
    buttonBgColor,
    buttonTextColor,
    buttonBgHoverColor,
    inputBgColor,
    inputTextColor,
  } = useThemeColors();

  const [loginError, setLoginError] = useState<string | undefined>(undefined);

  const initialFormikValues: SignInDataType = {
    email: "",
    password: "",
  };

  const handleSubmit = async (formikValues: SignInDataType) => {
    const loginReturnData = await login({
      email: formikValues.email,
      password: formikValues.password,
    });

    if (isLoginFailure(loginReturnData)) {
      setLoginError("Invalid login or password");
      return;
    }

    const loginSuccess = loginReturnData as LoginSuccessReturnType;
    setLocalStorageWithTime("refreshToken", loginSuccess.refresh, 30000000);
    setLocalStorageWithTime("authToken", loginSuccess.access, 30000);

    dispatch(
      setUserDataToStore({
        email: formikValues.email,
        password: formikValues.password,
      })
    );

    dispatch(setAccessTokenToStore(loginSuccess.access));
    navigation(RouterLocationsEnum.blogPage);
  };

  const formik = useFormik({
    initialValues: initialFormikValues,
    validationSchema: signInValidationSchema,
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
          height: "60vh",
        }}
      >
        <Stack
          sx={{
            width: "75%",
            height: "50%",
            borderRadius: "3px",
            padding: "20px",
            gap: "10px",
            alignItems: "center",
            backgroundColor: inputBgColor,
          }}
        >
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
            name="password"
            value={formik.values.password}
            error={!!formik.errors.password}
            helperText={formik.errors.password}
            label={"Password"}
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
              !!Object.values(formik.values).filter((value) => !value).length ||
              !!Object.keys(formik.errors).length
            }
            onClick={handleDone}
          >
            sign in
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default SignInForm;
