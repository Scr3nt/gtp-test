import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import Header from "@/src/components/Header/Header";
import Page from "@/src/components/Page/Page";
import { useTheme } from "@/src/context/theme";
import EmployeeList from "@/src/features/App/Employee/components/EmployeeList/EmployeeList";

export default function EditTaskPage() {
  const theme = useTheme();
  const styles = editTaskStyles();

  const onPress = (id: string) => {
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

const editTaskStyles = () => {
  const styles = StyleSheet.create({
    container: {
      padding: 0,
      paddingTop: 0,
    },
  });

  return styles;
};
