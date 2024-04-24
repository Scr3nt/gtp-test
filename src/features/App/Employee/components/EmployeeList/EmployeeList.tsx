import { router } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";

import { getAllEmployees } from "@/src/api/APIEmployee";
import Avatar from "@/src/components/Avatar/Avatar";
import Empty from "@/src/components/Empty/Empty";
import Separator from "@/src/components/Separator/Separator";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { queryKeys } from "@/src/queryKeys";
import { Theme } from "@/src/theme/theme";
import { formatTimestampzToDate } from "@/src/utils/formatDate";

import EmployeeListLoading from "./EmployeeListLoading";

type EmployeeListProps = {
  onPress?: (id: string) => void;
};

export default function EmployeeList(props: EmployeeListProps) {
  const theme = useTheme();
  const styles = employeeListStyles(theme);

  const employeeList = useQuery({
    queryKey: [queryKeys.employee.getAllEmployees],
    queryFn: () => getAllEmployees(),
  });

  const onPress = (id: string) => {
    if (props.onPress) {
      return props.onPress(id);
    }

    return router.navigate({
      pathname: "/edit_employee",
      params: { id: id },
    });
  };

  return (
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
          onPress={() => onPress(item.id)}
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
              Aucun employé
            </Text>
            <Text style={styles.space_bottom}>Veulliez en créer un</Text>
          </Empty>
        );
      }}
    />
  );
}

const employeeListStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
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
