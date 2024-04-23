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

export default function RegisterPage() {
  const theme = useTheme();
  const styles = registerStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleRegister = useMutation({
    mutationFn: () =>
      supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            is_admin: true,
          },
        },
      }),
  });

  return (
    <Page style={{ gap: theme.spacing.m }}>
      <StatusBar style={theme.colors.statusbar} />
      <Text type="bold" preset="title02">
        Inscription
      </Text>
      <TextInput
        placeholder="Email"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        error={handleRegister.data?.error?.message}
      />
      <TextInput
        placeholder="Mot de passe"
        label="Mot de passe"
        showHidePasswordButton
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Confirmation du mot de passe"
        label="Confirmation du mot de passe"
        showHidePasswordButton
        secureTextEntry
        value={passwordConfirmation}
        onChangeText={(text) => setPasswordConfirmation(text)}
        autoCapitalize="none"
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.navigate("/login")}
        style={styles.login_text}
      >
        <Text>Déjà un compte ?</Text>
        <Text type="semi-bold">Se connecter</Text>
      </TouchableOpacity>

      <Button
        loading={handleRegister.isLoading}
        onPress={() => handleRegister.mutate()}
      >
        Créer un compte
      </Button>
    </Page>
  );
}

const registerStyles = () => {
  const styles = StyleSheet.create({
    login_text: {
      alignItems: "center",
    },
  });
  return styles;
};
