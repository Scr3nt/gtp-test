import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { deleteTask, getTaskById, updateTask } from "@/src/api/APIEditTask";
import Button from "@/src/components/Button/Button";
import Header from "@/src/components/Header/Header";
import Page from "@/src/components/Page/Page";
import Text from "@/src/components/Text/Text";
import TextInput from "@/src/components/TextInput/TextInput";
import { useToast } from "@/src/components/Toast";
import { useTheme } from "@/src/context/theme";
import { queryKeys } from "@/src/queryKeys";
import { Theme } from "@/src/theme/theme";
import { formatHour } from "@/src/utils/formatHour";

type EditTaskParams = {
  date: string;
  id: string;
};

export default function EditTaskPage() {
  const theme = useTheme();
  const styles = editTaskStyles(theme);

  const params = useLocalSearchParams<EditTaskParams>();

  const toast = useToast();
  const queryClient = useQueryClient();

  const task = useQuery({
    queryKey: [queryKeys.task.getTaskById, params.id],
    queryFn: () => getTaskById(params.id),
    onSettled(data) {
      if (data) {
        setTitle(data.title);
        setStartHour(data.start_hour);
        setEndHour(data.end_hour);
      }
    },
  });

  const handleUpdateTask = useMutation({
    mutationFn: () =>
      updateTask(task.data?.id || "", title, startHour, endHour, toast),
    onSettled: () => {
      queryClient
        .invalidateQueries([queryKeys.task.getAllTasks])
        .catch(console.error);
    },
  });

  const handleDeleteTask = useMutation({
    mutationFn: () => deleteTask(task.data?.id || "", toast),
    onSettled: () => {
      queryClient
        .invalidateQueries([queryKeys.task.getAllTasks])
        .catch(console.error);
    },
  });

  const [title, setTitle] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const date = params.date;

  return (
    <Page style={styles.container}>
      <StatusBar style={theme.colors.statusbar} />
      <Header leftGoBack>Modifier une tâche</Header>
      <View style={{ padding: theme.spacing.m, gap: theme.spacing.m }}>
        <TextInput
          label="Libellé"
          placeholder="Libellé de la tâche"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          label="Heure de début"
          placeholder="Heure de début"
          value={startHour}
          onChangeText={(text) =>
            text.length <= 5 && setStartHour(formatHour(text))
          }
          inputMode="numeric"
          returnKeyType="done"
        />
        <TextInput
          label="Heure de fin"
          placeholder="Heure de fin"
          value={endHour}
          onChangeText={(text) => setEndHour(formatHour(text))}
          inputMode="numeric"
          returnKeyType="done"
        />
        <TextInput
          label="Date"
          placeholder="Date"
          value={date}
          editable={false}
        />
        <Button
          loading={handleUpdateTask.isLoading}
          onPress={() => handleUpdateTask.mutate()}
        >
          Modifier la tâche
        </Button>
        <Button
          onPress={() => handleDeleteTask.mutate()}
          loading={handleDeleteTask.isLoading}
          spinnerColor={theme.colors.red11}
          style={styles.delete_button}
        >
          <Text type="semi-bold" style={styles.delete_button_text}>
            Supprimer la tâche
          </Text>
        </Button>
      </View>
    </Page>
  );
}

const editTaskStyles = (theme: Theme) => {
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
