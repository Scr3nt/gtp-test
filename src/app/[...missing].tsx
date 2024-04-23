import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import Button from "../components/Button/Button";
import Error from "../components/Error/Error";
import Page from "../components/Page/Page";
import Text from "../components/Text/Text";
import { useTheme } from "../context/theme";
import { Theme } from "../theme/theme";

export default function Missing() {
  const theme = useTheme();
  const styles = missingStyles(theme);
  return (
    <Page>
      <View style={styles.error_container}>
        <Error>
          <Text preset="title03" type="bold" style={styles.space_bottom}>
            {"Oops this page doesn't exist"}
          </Text>
          <Button onPress={() => router.replace("/")}>Go Home</Button>
        </Error>
      </View>
    </Page>
  );
}

const missingStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    error_container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    space_bottom: {
      marginBottom: theme.spacing.l,
    },
  });
  return styles;
};
