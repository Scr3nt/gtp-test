import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useMutation } from "react-query";

import { createTask } from "@/src/api/APICreateTask";
import Button from "@/src/components/Button/Button";
import Header from "@/src/components/Header/Header";
import Page from "@/src/components/Page/Page";
import TextInput from "@/src/components/TextInput/TextInput";
import { useToast } from "@/src/components/Toast";
import { useTheme } from "@/src/context/theme";
import { useUser } from "@/src/hooks/useUser";
import { formatHour } from "@/src/utils/formatHour";

type CreateTaskParams = {
  date: string;
};

export default function CreateTaskPage() {
  const theme = useTheme();
  const styles = createTaskStyles();

  const params = useLocalSearchParams<CreateTaskParams>();

  const [title, setTitle] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const date = params.date;

  const user = useUser();
  const toast = useToast();

  const handleCreateTask = useMutation({
    mutationFn: () => createTask(title, startHour, endHour, date, user, toast),
  });

  return (
    <Page style={styles.container}>
      <StatusBar style={theme.colors.statusbar} />
      <Header leftGoBack>Créer une tâche</Header>
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
          loading={handleCreateTask.isLoading}
          onPress={() => {
            handleCreateTask.mutate();
          }}
        >
          Créer la tâche
        </Button>
      </View>
    </Page>
  );
}

const createTaskStyles = () => {
  const styles = StyleSheet.create({
    container: {
      padding: 0,
      paddingTop: 0,
    },
  });

  return styles;
};
