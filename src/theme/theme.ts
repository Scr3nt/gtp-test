import { DarkBlue, LightBlue } from "./colors/blue";
import { DarkBrown, LightBrown } from "./colors/brown";
import { DarkGray, LightGray } from "./colors/gray";
import { DarkGreen, LightGreen } from "./colors/green";
import { DarkOrange, LightOrange } from "./colors/orange";
import { DarkPink, LightPink } from "./colors/pink";
import { DarkPurple, LightPurple } from "./colors/purple";
import { DarkRed, LightRed } from "./colors/red";
import { DarkYellow, LightYellow } from "./colors/yellow";

type Colors = typeof DarkColors | typeof LightColors;
type Spacing = {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
};
type FontSize = {
  caption: number;
  body: number;
  subtitle: number;
  title03: number;
  title02: number;
  title01: number;
};

type FontType = {
  thin: string;
  extraLight: string;
  light: string;
  regular: string;
  medium: string;
  semiBold: string;
  bold: string;
  extraBold: string;
  black: string;
};

export type Theme = {
  colors: Colors & {
    background: string;
    statusbar: "light" | "dark";
    text: string;
    backdrop: string;
  };
  spacing: Spacing;
  fontSize: FontSize;
  fontFamily: FontType;
};

// colors from : https://www.radix-ui.com/colors

const DarkColors = {
  ...DarkGray,
  ...DarkRed,
  ...DarkPink,
  ...DarkPurple,
  ...DarkBlue,
  ...DarkBrown,
  ...DarkOrange,
  ...DarkYellow,
  ...DarkGreen,
  white: "rgb(255, 255, 255)",
  black: "rgb(15, 15 ,15)",
  transparent: "rgba(0, 0, 0, 0)",
};

const LightColors = {
  ...LightGray,
  ...LightRed,
  ...LightPink,
  ...LightPurple,
  ...LightBlue,
  ...LightBrown,
  ...LightOrange,
  ...LightYellow,
  ...LightGreen,
  white: "rgb(255, 255, 255)",
  black: "rgb(15, 15, 15)",
  transparent: "rgba(0, 0, 0, 0)",
};

export const DarkTheme: Theme = {
  colors: {
    ...DarkColors,
    background: DarkColors.black,
    statusbar: "light",
    text: DarkColors.gray12,
    backdrop: "rgba(0, 0, 0, 0.5)",
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  fontSize: {
    caption: 12,
    body: 16,
    subtitle: 20,
    title03: 22,
    title02: 28,
    title01: 34,
  },
  fontFamily: {
    thin: "Inter-Thin",
    extraLight: "Inter-ExtraLight",
    light: "Inter-Light",
    regular: "Inter-Regular",
    medium: "Inter-Medium",
    semiBold: "Inter-SemiBold",
    bold: "Inter-Bold",
    extraBold: "Inter-ExtraBold",
    black: "Inter-Black",
  },
};

export const LightTheme: Theme = {
  colors: {
    ...LightColors,
    background: LightColors.white,
    statusbar: "dark",
    text: LightColors.gray12,
    backdrop: "rgba(0, 0, 0, 0.5)",
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  fontSize: {
    caption: 12,
    body: 16,
    subtitle: 20,
    title03: 22,
    title02: 28,
    title01: 34,
  },
  fontFamily: {
    thin: "Inter-Thin",
    extraLight: "Inter-ExtraLight",
    light: "Inter-Light",
    regular: "Inter-Regular",
    medium: "Inter-Medium",
    semiBold: "Inter-SemiBold",
    bold: "Inter-Bold",
    extraBold: "Inter-ExtraBold",
    black: "Inter-Black",
  },
};
