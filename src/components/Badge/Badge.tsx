import { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

import Text from "../Text/Text";

type Props = ViewProps & {
  children?: ReactNode;
};

export default function Badge(props: Props) {
  const theme = useTheme();
  const styles = badgeStyles(theme);

  const renderChildren = () => {
    if (props.children && typeof props.children === "string") {
      return (
        <Text type="medium" style={styles.text}>
          {props.children}
        </Text>
      );
    }
    return props.children;
  };

  return (
    <View style={[styles.container, props.style]}>{renderChildren()}</View>
  );
}

const badgeStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      padding: 6,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.gray12,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "flex-start",
    },
    text: {
      color: theme.colors.background,
    },
  });
  return styles;
};
