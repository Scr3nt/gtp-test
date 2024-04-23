import { StyleSheet } from "react-native";

import Page from "@/src/components/Page/Page";
import Text from "@/src/components/Text/Text";

export default function Settings() {
  return (
    <Page style={styles.container}>
      <Text preset="title01" type="bold" style={styles.text}>
        Settings
      </Text>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
});
