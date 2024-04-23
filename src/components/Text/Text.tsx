/* eslint-disable react-native/no-unused-styles */
import { useMemo } from "react";
import { StyleSheet, Text as T, TextProps } from "react-native";

import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export type TextType =
  | "thin"
  | "extra-light"
  | "light"
  | "regular"
  | "medium"
  | "semi-bold"
  | "bold"
  | "extra-bold"
  | "black";

type Props = TextProps & {
  type?: TextType;
  preset?: "title01" | "title02" | "title03" | "subtitle" | "body" | "caption";
};

export default function Text(props: Props) {
  const theme = useTheme();

  const fontFamily = useMemo(() => {
    switch (props.type) {
      case "thin":
        return theme.fontFamily.thin;
      case "extra-light":
        return theme.fontFamily.extraLight;
      case "light":
        return theme.fontFamily.light;
      case "regular":
        return theme.fontFamily.regular;
      case "medium":
        return theme.fontFamily.medium;
      case "semi-bold":
        return theme.fontFamily.semiBold;
      case "bold":
        return theme.fontFamily.bold;
      case "extra-bold":
        return theme.fontFamily.extraBold;
      case "black":
        return theme.fontFamily.black;
      default:
        return theme.fontFamily.regular;
    }
  }, [props.type, theme.fontFamily]);

  const styles = textStyles(fontFamily, theme);

  return (
    <T {...props} style={[styles[props.preset || "body"], props.style]}>
      {props.children}
    </T>
  );
}

const textStyles = (type: string, theme: Theme) => {
  const styles = StyleSheet.create({
    body: {
      fontFamily: type,
      color: theme.colors.text,
      fontSize: theme.fontSize.body,
      lineHeight: 22,
    },
    title01: {
      fontSize: theme.fontSize.title01,
      lineHeight: 41,
      fontFamily: type,
      color: theme.colors.text,
    },
    title02: {
      fontSize: theme.fontSize.title02,
      lineHeight: 34,
      fontFamily: type,
      color: theme.colors.text,
    },
    title03: {
      fontSize: theme.fontSize.title03,
      lineHeight: 28,
      fontFamily: type,
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: theme.fontSize.subtitle,
      lineHeight: 25,
      fontFamily: type,
      color: theme.colors.text,
    },
    caption: {
      fontSize: theme.fontSize.caption,
      lineHeight: 16,
      fontFamily: type,
      color: theme.colors.text,
    },
  });
  return styles;
};
