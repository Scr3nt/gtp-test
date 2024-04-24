import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useMutation } from "react-query";

import Button from "@/src/components/Button/Button";
import Page from "@/src/components/Page/Page";
import Text from "@/src/components/Text/Text";
import TextInput from "@/src/components/TextInput/TextInput";
import { useToast } from "@/src/components/Toast";
import { useTheme } from "@/src/context/theme";
import { supabase } from "@/src/lib/supabase";

export default function RegisterPage() {
  const theme = useTheme();
  const styles = registerStyles();

  const toast = useToast();

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
    onSettled(data) {
      if (data?.error) {
        toast.showToast({
          title: "Erreur",
          subtitle: data.error.message,
          key: "register_error",
          icon: { name: "alert-circle-outline", size: 24, color: "red11" },
        });
        return;
      }
    },
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
      />
      <TextInput
        placeholder="Mot de passe"
        label="Mot de passe"
        showHidePasswordButton
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        hint="8 caractères minimum"
      />
      <TextInput
        placeholder="Confirmation du mot de passe"
        label="Confirmation du mot de passe"
        showHidePasswordButton
        secureTextEntry
        value={passwordConfirmation}
        onChangeText={(text) => setPasswordConfirmation(text)}
        autoCapitalize="none"
        hint="8 caractères minimum"
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
        onPress={() => {
          if (password.length < 8) {
            return toast.showToast({
              title: "Erreur",
              subtitle: "Le mot de passe doit contenir au moins 8 caractères",
              key: "register_password_error",
              icon: { name: "alert-circle-outline", size: 24, color: "red11" },
            });
          }
          if (password !== passwordConfirmation) {
            return toast.showToast({
              title: "Erreur",
              subtitle: "Les mots de passe ne correspondent pas",
              key: "register_password_error",
              icon: { name: "alert-circle-outline", size: 24, color: "red11" },
            });
          }
          handleRegister.mutate();
        }}
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
