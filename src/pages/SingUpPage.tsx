import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import ContentWithPaddings from "#containers/contentWithPaddings";
import { RouterLocationsEnum } from "#router/Router";
import SignUpForm from "#containers/signUpForm/SignUpForm";
import useThemeColors from "#hooks/useThemeColors";

const SignUpPage: React.FC = () => {
  const navigation = useNavigate();
  const { textColor } = useThemeColors();

  return (
    <ContentWithPaddings>
      <IconButton
        onClick={() => navigation(RouterLocationsEnum.main)}
        sx={{ color: textColor }}
      >
        <ArrowBack />
      </IconButton>
      <SignUpForm />
    </ContentWithPaddings>
  );
};
export default SignUpPage;
