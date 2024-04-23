import {
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

type Props = ScrollViewProps &
  ViewProps & {
    isScrollView?: boolean;
  };

export default function Page(props: Props) {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = pageStyle(theme, safeAreaInsets, !!props.isScrollView);

  if (props.isScrollView) {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[styles.container, props.style]}
        contentContainerStyle={[styles.content, props.contentContainerStyle]}
      >
        {props.children}
      </ScrollView>
    );
  }

  return <View style={[styles.container, props.style]}>{props.children}</View>;
}

const pageStyle = (
  theme: Theme,
  safeArea: EdgeInsets,
  isScrollView: boolean,
) => {
  const paddingTop = () => {
    if (Platform.OS === "ios") {
      if (safeArea.top < 30) {
        return safeArea.top + theme.spacing.s;
      } else {
        return safeArea.top;
      }
    }
    return safeArea.top + theme.spacing.m;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.m,
      paddingTop: isScrollView ? 0 : paddingTop(),
    },
    content: {
      width: "100%",
      paddingTop: paddingTop(),
    },
  });

  return styles;
};
