import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
} from "@/src/api/APIEmployee";
import Button from "@/src/components/Button/Button";
import Header from "@/src/components/Header/Header";
import Page from "@/src/components/Page/Page";
import Text from "@/src/components/Text/Text";
import TextInput from "@/src/components/TextInput/TextInput";
import { useToast } from "@/src/components/Toast";
import { useTheme } from "@/src/context/theme";
import { queryKeys } from "@/src/queryKeys";
import { Theme } from "@/src/theme/theme";

type EditEmployeeParams = {
  id: string;
};

export default function EditEmployeePage() {
  const theme = useTheme();
  const styles = editEmployeeStyles(theme);

  const params = useLocalSearchParams<EditEmployeeParams>();

  const toast = useToast();
  const queryClient = useQueryClient();

  const employee = useQuery({
    queryKey: [queryKeys.employee.getEmployeeById, params.id],
    queryFn: () => getEmployeeById(params.id),
    onSettled(data) {
      if (data) {
        setName(data.name);
      }
    },
  });

  const [name, setName] = useState("");

  const handleUpdateEmployee = useMutation({
    mutationFn: () => updateEmployee(employee.data?.id || "", name, toast),
    onSettled: () => {
      queryClient
        .invalidateQueries([queryKeys.employee.getAllEmployees])
        .catch(console.error);
    },
  });

  const handleDeleteEmployee = useMutation({
    mutationFn: () => deleteEmployee(employee.data?.id || "", toast),
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

        <Button
          loading={handleUpdateEmployee.isLoading}
          onPress={() => handleUpdateEmployee.mutate()}
        >
          {"Modifier l'employé"}
        </Button>
        <Button
          onPress={() => handleDeleteEmployee.mutate()}
          loading={handleDeleteEmployee.isLoading}
          spinnerColor={theme.colors.red11}
          style={styles.delete_button}
        >
          <Text type="semi-bold" style={styles.delete_button_text}>
            {"Supprimer l'employé"}
          </Text>
        </Button>
      </View>
    </Page>
  );
}

const editEmployeeStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      padding: 0,
      paddingTop: 0,
    },
    delete_button: {
      backgroundColor: theme.colors.red03,
    },
    delete_button_text: {
      color: theme.colors.red11,
    },
  });

  return styles;
};
