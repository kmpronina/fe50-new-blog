import {
  black,
  white,
  lightblue,
  // blue,
  lightgray,
  gray,
  darkgray,
  // red,
} from './colorsContants';

type ThemeColorType = {
  backgroundColor: string;
  cardBgColor: string;
  textColor: string;
  titleColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  inputBgColor: string;
  inputTextColor: string;
};

type ThemeVariant = {
  dark: ThemeColorType;
  light: ThemeColorType;
};

export const colors: ThemeVariant = {
  light: {
    backgroundColor: lightgray,
    cardBgColor: white,
    textColor: darkgray,
    titleColor: black,
    buttonBgColor: lightblue,
    buttonTextColor: darkgray,
    inputBgColor: lightblue,
    inputTextColor: darkgray,
  },
  dark: {
    backgroundColor: black,
    cardBgColor: darkgray,
    textColor: white,
    titleColor: white,
    buttonBgColor: gray,
    buttonTextColor: white,
    inputBgColor: gray,
    inputTextColor: white,
  },
};
