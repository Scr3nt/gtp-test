import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { useQuery } from "react-query";

import { getAllEmployeesWithTasks } from "@/src/api/APIEmployee";
import Header from "@/src/components/Header/Header";
import Page from "@/src/components/Page/Page";
import { useToast } from "@/src/components/Toast";
import { useTheme } from "@/src/context/theme";
import EmployeeList from "@/src/features/App/Employee/components/EmployeeList/EmployeeList";
import { queryKeys } from "@/src/queryKeys";

type SelectEmployeeParams = {
  date: string;
};

export default function SelectEmployeePage() {
  const theme = useTheme();
  const styles = selectEmployeeStyles();

  const toast = useToast();

  const params = useLocalSearchParams<SelectEmployeeParams>();

  const employeewWithTasksList = useQuery({
    queryKey: [queryKeys.employee.getAllEmployeesWithTasks],
    queryFn: () => getAllEmployeesWithTasks(params.date),
  });

  const onPress = (id: string) => {
    if (
      employeewWithTasksList.data &&
      employeewWithTasksList.data.map((e) => e.id).includes(id)
    ) {
      return toast.showToast({
        title: "Erreur",
        subtitle: "L'employé est déjà assigné à une tâche",
        key: "delete_employee_error",
        icon: { name: "alert-circle-outline", size: 24, color: "red11" },
      });
    }
    router.back();

    router.setParams({ employee_id: id });
  };

  return (
    <Page style={styles.container}>
      <StatusBar style={theme.colors.statusbar} />
      <Header leftGoBack>Séléctionner un employé</Header>
      <EmployeeList onPress={(id) => onPress(id)} />
    </Page>
  );
}

const selectEmployeeStyles = () => {
  const styles = StyleSheet.create({
    container: {
      padding: 0,
      paddingTop: 0,
    },
  });

  return styles;
};
