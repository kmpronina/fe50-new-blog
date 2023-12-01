import React from "react";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import ContentWithPaddings from "#containers/contentWithPaddings";
import { useNavigate } from "react-router-dom";
import { RouterLocationsEnum } from "#router/Router";
import SignInForm from "#containers/signInForm/SignInForm";

const SignInPage: React.FC = () => {
  const navigation = useNavigate();

  return (
    <ContentWithPaddings>
      <IconButton onClick={() => navigation(RouterLocationsEnum.main)}>
        <ArrowBack />
      </IconButton>
      <SignInForm />
    </ContentWithPaddings>
  );
};
export default SignInPage;
