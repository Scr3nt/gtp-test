import { StyleSheet, View, ViewProps } from "react-native";

import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function Card(props: ViewProps) {
  const theme = useTheme();
  const styles = cardStyle(theme);
  return <View style={[styles.container, props.style]}>{props.children}</View>;
}

const cardStyle = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.gray04,
      borderRadius: 8,
      overflow: "hidden",
    },
  });

  return styles;
};
