import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useMutation, useQueryClient } from "react-query";

import { createEmployee } from "@/src/api/APIEmployee";
import Button from "@/src/components/Button/Button";
import Header from "@/src/components/Header/Header";
import Page from "@/src/components/Page/Page";
import TextInput from "@/src/components/TextInput/TextInput";
import { useToast } from "@/src/components/Toast";
import { useTheme } from "@/src/context/theme";
import { useUser } from "@/src/hooks/useUser";
import { queryKeys } from "@/src/queryKeys";

export default function CreateEmployeePage() {
  const theme = useTheme();
  const styles = createEmployeeStyles();

  const user = useUser();
  const toast = useToast();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateEmployee = useMutation({
    mutationFn: () =>
      createEmployee(email, password, name, user?.id || "", toast),
    onSettled: () => {
      queryClient
        .invalidateQueries([queryKeys.employee.getAllEmployees])
        .catch(console.error);
    },
  });

  return (
    <Page style={styles.container}>
      <StatusBar style={theme.colors.statusbar} />
      <Header leftGoBack>Créer un employé</Header>
      <View style={{ padding: theme.spacing.m, gap: theme.spacing.m }}>
        <TextInput
          label="Nom de l'employé"
          placeholder="Nom de l'employé"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          label="Mot de passe"
          placeholder="Mot de passe"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          showHidePasswordButton
          autoCapitalize="none"
        />

        <Button
          loading={handleCreateEmployee.isLoading}
          onPress={() => handleCreateEmployee.mutate()}
        >
          {"Créer l'employé"}
        </Button>
      </View>
    </Page>
  );
}

const createEmployeeStyles = () => {
  const styles = StyleSheet.create({
    container: {
      padding: 0,
      paddingTop: 0,
    },
  });

  return styles;
};
