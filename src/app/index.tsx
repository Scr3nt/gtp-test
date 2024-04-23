import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet } from "react-native";

import { useTheme } from "@/src/context/theme";

import Page from "../components/Page/Page";

export default function Index() {
  const theme = useTheme();
  const styles = indexStyles();
  return (
    <Page style={styles.container}>
      <StatusBar style={theme.colors.statusbar} />
      <ActivityIndicator color={theme.colors.text} />
    </Page>
  );
}

const indexStyles = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return styles;
};
