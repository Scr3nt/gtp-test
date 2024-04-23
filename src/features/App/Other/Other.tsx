import { router } from "expo-router";
import { StyleSheet } from "react-native";

import Button from "@/src/components/Button/Button";
import Page from "@/src/components/Page/Page";
import Text from "@/src/components/Text/Text";

export default function Other() {
  return (
    <Page style={styles.container}>
      <Text preset="title01" type="bold" style={styles.title}>
        Other
      </Text>

      <Button style={styles.button} onPress={() => router.back()}>
        Go back
      </Button>
    </Page>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
  },
  title: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
  },
});
