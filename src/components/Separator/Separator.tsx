import { StyleSheet, View } from "react-native";

import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

type Props = {
  style?: View["props"]["style"];
};

export default function Separator(props: Props) {
  const theme = useTheme();
  const styles = separatorStyles(theme);
  return <View testID="separator" style={[styles.separator, props.style]} />;
}

const separatorStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    separator: {
      height: 1,
      backgroundColor: theme.colors.gray03,
    },
  });

  return styles;
};
