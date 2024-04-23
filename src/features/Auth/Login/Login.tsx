import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import Button from "@/src/components/Button/Button";
import Page from "@/src/components/Page/Page";
import Text from "@/src/components/Text/Text";
import { useAuth } from "@/src/context/auth";
import { useTheme } from "@/src/context/theme";

export default function Login() {
  const theme = useTheme();
  const authContext = useAuth();

  const handleLogin = () => {
    if (authContext && "signIn" in authContext) {
      authContext.signIn();
    }
  };

  return (
    <Page style={styles.container}>
      <StatusBar style={theme.colors.statusbar} />
      <Text preset="title01" type="bold" style={styles.title}>
        Login
      </Text>

      <Button style={styles.button} onPress={() => router.push("/register")}>
        Go Register
      </Button>

      <Button onPress={handleLogin} style={styles.button}>
        Go Home
      </Button>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
  },
  title: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
  },
});
