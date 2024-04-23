import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";

import { getAllEmployees } from "@/src/api/APIEmployee";
import Avatar from "@/src/components/Avatar/Avatar";
import Button from "@/src/components/Button/Button";
import Empty from "@/src/components/Empty/Empty";
import Page from "@/src/components/Page/Page";
import Separator from "@/src/components/Separator/Separator";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import EmployeeListLoading from "@/src/features/App/Employee/components/EmployeeList/EmployeeListLoading";
import { queryKeys } from "@/src/queryKeys";
import { Theme } from "@/src/theme/theme";
import { formatTimestampzToDate } from "@/src/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";

export default function EmployeePage() {
  const theme = useTheme();
  const styles = employeeStyles(theme);

  const employeeList = useQuery({
    queryKey: [queryKeys.employee.getAllEmployees],
    queryFn: () => getAllEmployees(),
  });

  return (
    <Page style={styles.container}>
      <Page isScrollView style={styles.content}>
        <StatusBar style={theme.colors.statusbar} />
        <Text type="semi-bold" preset="title03" style={styles.title}>
          Liste des employés
        </Text>
        <FlatList
          scrollEnabled={false}
          data={employeeList.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                paddingVertical: theme.spacing.s,
                paddingHorizontal: theme.spacing.m,
              }}
              activeOpacity={0.8}
              onPress={() =>
                router.navigate({
                  pathname: "/edit_employee",
                  params: { id: item.id },
                })
              }
            >
              <View style={styles.employee_container}>
                <Avatar size={40} initials={item.name.slice(0, 1)} />
                <View>
                  <Text type="semi-bold">{item.name}</Text>
                  <Text preset="caption">
                    Crée le {formatTimestampzToDate(item.created_at)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          // eslint-disable-next-line react/no-unstable-nested-components
          ItemSeparatorComponent={() => <Separator />}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListFooterComponent={() => {
            if (employeeList.isFetching) {
              return <EmployeeListLoading />;
            }
          }}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListEmptyComponent={() => {
            if (employeeList.isFetching) {
              return;
            }
            return (
              <Empty style={{ padding: theme.spacing.l }}>
                <Text preset="title03" type="bold" style={styles.space_bottom}>
                  Aucune tâche
                </Text>
                <Text style={styles.space_bottom}>Veulliez en créer une</Text>
              </Empty>
            );
          }}
        />
      </Page>
      <Button
        onPress={() => {
          router.navigate({ pathname: "/create_employee" });
        }}
        style={styles.create_employee}
      >
        <>
          <Text style={styles.create_employee_text} type="bold">
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
      marginBottom: theme.spacing.s,
    },
    create_employee: {
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
    create_employee_text: {
      color: theme.colors.blue11,
    },
    employee_container: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.s,
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });

  return styles;
};
