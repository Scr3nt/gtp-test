import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import Button from "@/src/components/Button/Button";
import Page from "@/src/components/Page/Page";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";
import { Ionicons } from "@expo/vector-icons";

export default function EmployeePage() {
  const theme = useTheme();
  const styles = employeeStyles(theme);

  return (
    <Page style={styles.container}>
      <Page isScrollView style={styles.content}>
        <StatusBar style={theme.colors.statusbar} />
        <Text type="semi-bold" preset="title03" style={styles.title}>
          Liste des employés
        </Text>
      </Page>
      <Button
        onPress={() => {
          router.navigate({ pathname: "/create_employee" });
        }}
        style={styles.create_task}
      >
        <>
          <Text style={styles.create_task_text} type="bold">
            Créer un employé
          </Text>
          <Ionicons name="add" size={24} color={theme.colors.blue11} />
        </>
      </Button>
    </Page>
  );
}

const employeeStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      padding: 0,
      paddingTop: 0,
    },
    content: {
      padding: 0,
    },
    title: {
      paddingHorizontal: theme.spacing.m,
    },
    create_task: {
      backgroundColor: theme.colors.blue03,
      borderRadius: 40,
      position: "absolute",
      right: theme.spacing.m,
      bottom: theme.spacing.m,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.xs,
    },
    create_task_text: {
      color: theme.colors.blue11,
    },
  });

  return styles;
};
