import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";

import { getAllTasks } from "@/src/api/APITask";
import Empty from "@/src/components/Empty/Empty";
import Separator from "@/src/components/Separator/Separator";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { queryKeys } from "@/src/queryKeys";
import { Theme } from "@/src/theme/theme";
import { TasksListSortOptions } from "@/src/types/Tasks.type";

import SortOptions from "../SortOptions";
import TasksListLoading from "./TasksListLoading";

type TaskListProps = {
  date: string;
};

export default function TasksList({ date }: TaskListProps) {
  const theme = useTheme();
  const styles = tasksListStyles(theme);
  const [sort, setSort] = useState<TasksListSortOptions>("title");

  const tasksList = useQuery({
    queryKey: [queryKeys.task.getAllTasks, sort, date],
    queryFn: () => getAllTasks(date, sort),
  });

  return (
    <>
      <SortOptions
        sortType={sort}
        onChangeSortType={(value) => setSort(value)}
      />

      <FlatList
        scrollEnabled={false}
        data={tasksList.data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              paddingVertical: theme.spacing.s,
              paddingHorizontal: theme.spacing.m,
              gap: theme.spacing.xs,
            }}
            activeOpacity={0.8}
            onPress={() =>
              router.navigate({
                pathname: "/edit_task",
                params: { date, id: item.id },
              })
            }
          >
            <Text type="semi-bold">{item.title}</Text>
            <Text preset="caption">
              {item.start_hour} - {item.end_hour}
            </Text>
            {item.employee && (
              <Text preset="caption">
                Employé assigné : {item.employee.name}
              </Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <Separator />}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListFooterComponent={() => {
          if (tasksList.isFetching) {
            return <TasksListLoading />;
          }
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListEmptyComponent={() => {
          if (tasksList.isFetching) {
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
    </>
  );
}

const tasksListStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });

  return styles;
};
