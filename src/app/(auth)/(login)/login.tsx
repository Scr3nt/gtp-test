import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useMutation } from "react-query";

import Button from "@/src/components/Button/Button";
import Page from "@/src/components/Page/Page";
import Text from "@/src/components/Text/Text";
import TextInput from "@/src/components/TextInput/TextInput";
import { useTheme } from "@/src/context/theme";
import { supabase } from "@/src/lib/supabase";

export default function LoginPage() {
  const theme = useTheme();
  const styles = loginStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useMutation({
    mutationFn: () => supabase.auth.signInWithPassword({ email, password }),
  });

  return (
    <Page style={{ gap: theme.spacing.m }}>
      <StatusBar style={theme.colors.statusbar} />
      <Text type="bold" preset="title02">
        Connexion
      </Text>

      <TextInput
        placeholder="Email"
        label="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
        error={handleLogin.data?.error?.message}
      />
      <TextInput
        placeholder="Mot de passe"
        label="Mot de passe"
        showHidePasswordButton
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.navigate("/register")}
        style={styles.register_text}
      >
        <Text type="semi-bold">Créer un compte</Text>
      </TouchableOpacity>

      <Button
        loading={handleLogin.isLoading}
        onPress={() => handleLogin.mutate()}
      >
        Connexion
      </Button>
    </Page>
  );
}

const loginStyles = () => {
  const styles = StyleSheet.create({
    register_text: {
      alignItems: "center",
    },
  });
  return styles;
};
