import {
  black,
  white,
  lightblue,
  blue,
  lightgray,
  gray,
  darkgray,
  // red,
} from "./colorsContants";

type ThemeColorType = {
  backgroundColor: string;
  cardBgColor: string;
  textColor: string;
  titleColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  inputBgColor: string;
  inputTextColor: string;
  buttonBgHoverColor: string;
};

type ThemeVariant = {
  dark: ThemeColorType;
  light: ThemeColorType;
};

export const colors: ThemeVariant = {
  light: {
    backgroundColor: white,
    cardBgColor: lightblue,
    textColor: darkgray,
    titleColor: black,
    buttonBgColor: lightblue,
    buttonTextColor: black,
    inputBgColor: white,
    inputTextColor: darkgray,
    buttonBgHoverColor: blue,
  },
  dark: {
    backgroundColor: black,
    cardBgColor: darkgray,
    textColor: white,
    titleColor: white,
    buttonBgColor: darkgray,
    buttonTextColor: white,
    inputBgColor: gray,
    inputTextColor: white,
    buttonBgHoverColor: gray,
  },
};
