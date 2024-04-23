import { isValidElement, useMemo } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { useTheme, useThemeSettings } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

import Text from "../Text/Text";

type Props = TouchableOpacityProps & {
  outline?: boolean;
  disabled?: boolean;
  loading?: boolean;
  spinnerColor?: string;
};

interface ButtonStylesParams {
  outline: boolean;
  disabled: boolean;
}

export default function Button(props: Props) {
  const theme = useTheme();
  const { isDarkTheme } = useThemeSettings();
  const styles = buttonStyles(
    {
      outline: !!props.outline,
      disabled: !!props.disabled,
    },
    theme,
    isDarkTheme,
  );

  const spinnerColor = useMemo(() => {
    if (props.spinnerColor) {
      return props.spinnerColor;
    }
    if (props.outline && props.disabled) {
      return theme.colors.gray11;
    }
    if (props.outline && isDarkTheme) {
      return theme.colors.gray12;
    }
    if (props.outline) {
      return theme.colors.gray12;
    }
    if (props.disabled) {
      return theme.colors.gray11;
    }
    if (isDarkTheme) {
      return theme.colors.black;
    }
    return theme.colors.white;
  }, [isDarkTheme, props.disabled, props.outline, props.spinnerColor, theme]);

  const onPress = (event: GestureResponderEvent) => {
    if (props.loading) {
      return;
    }

    if (props.disabled) {
      return;
    }

    return props.onPress && props.onPress(event);
  };

  const children = () => {
    if (props.loading) {
      return (
        <View style={styles.loading_container}>
          <Text type="semi-bold" style={[styles.text, styles.loading_text]}>
            {props.children || "Button"}
          </Text>
          <ActivityIndicator color={spinnerColor} style={styles.spinner} />
        </View>
      );
    }

    if (typeof props.children === "string") {
      return (
        <Text type="semi-bold" style={styles.text}>
          {props.children}
        </Text>
      );
    }

    if (isValidElement(props.children)) {
      return props.children;
    }

    return (
      <Text type="semi-bold" style={styles.text}>
        Button
      </Text>
    );
  };

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={
        props.disabled || props.loading ? 1 : props.outline ? 0.7 : 0.8
      }
      style={[styles.container, props.style]}
      onPress={onPress}
    >
      {children()}
    </TouchableOpacity>
  );
}

const buttonStyles = (
  params: ButtonStylesParams,
  theme: Theme,
  isDarkTheme: boolean,
) => {
  const backgroundColor = () => {
    if (params.outline) {
      return theme.colors.transparent;
    }
    if (params.disabled) {
      return theme.colors.gray03;
    }

    if (isDarkTheme) {
      return theme.colors.white;
    }

    return theme.colors.black;
  };

  const borderColor = () => {
    if (params.disabled) {
      return theme.colors.gray11;
    }
    if (params.outline && isDarkTheme) {
      return theme.colors.gray11;
    }
    if (params.outline) {
      return theme.colors.black;
    }
    return theme.colors.transparent;
  };

  const textColor = () => {
    if (params.disabled && params.outline) {
      return theme.colors.gray11;
    }
    if (params.outline && isDarkTheme) {
      return theme.colors.gray12;
    }
    if (params.outline) {
      return theme.colors.black;
    }
    if (params.disabled) {
      return theme.colors.gray11;
    }
    if (isDarkTheme) {
      return theme.colors.black;
    }
    return theme.colors.white;
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: backgroundColor(),
      paddingHorizontal: params.outline ? 14 : 15,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: params.outline ? 1 : 0,
      borderColor: borderColor(),
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: textColor(),
    },
    loading_container: { justifyContent: "center" },
    loading_text: { opacity: 0 },
    spinner: {
      position: "absolute",
      alignSelf: "center",
    },
  });

  return styles;
};
