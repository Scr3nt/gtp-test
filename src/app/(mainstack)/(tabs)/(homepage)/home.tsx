import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

import Button from "@/src/components/Button/Button";
import Page from "@/src/components/Page/Page";
import Text from "@/src/components/Text/Text";
import { useTheme, useThemeSettings } from "@/src/context/theme";
import TasksList from "@/src/features/App/Home/components/TasksList/TasksList";
import { Theme } from "@/src/theme/theme";
import { formatDate } from "@/src/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";

export default function HomePage() {
  const theme = useTheme();
  const themeContext = useThemeSettings();
  const styles = homeStyles(theme);
  const [date, setDate] = useState(formatDate(new Date()));

  const onDayPress = (dayPressed: DateData) => {
    setDate(dayPressed.dateString);
  };

  // for reload calendar when change theme
  const calendarKey = themeContext.isDarkTheme ? "dark" : "light";

  return (
    <Page style={styles.container}>
      <Page isScrollView style={styles.content}>
        <StatusBar style={theme.colors.statusbar} />
        <View key={calendarKey}>
          <Calendar
            theme={{
              todayTextColor: theme.colors.text,
              textDisabledColor: theme.colors.gray07,
              dayTextColor: theme.colors.text,
              monthTextColor: theme.colors.text,
              arrowColor: theme.colors.blue11,
              textDayFontFamily: theme.fontFamily.regular,
              calendarBackground: theme.colors.background,
              textMonthFontFamily: theme.fontFamily.bold,
              selectedDayBackgroundColor: theme.colors.blue03,
              selectedDayTextColor: theme.colors.blue11,
            }}
            onDayPress={onDayPress}
            markedDates={{
              [date]: { selected: true },
            }}
            refreshing={false}
            firstDay={1}
          />
        </View>
        <TasksList date={date} />
      </Page>
      <Button
        onPress={() => {
          router.navigate({ pathname: "/create_task", params: { date } });
        }}
        style={styles.create_task}
      >
        <>
          <Text style={styles.create_task_text} type="bold">
            Créer une tâche
          </Text>
          <Ionicons name="add" size={24} color={theme.colors.blue11} />
        </>
      </Button>
    </Page>
  );
}

const homeStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      padding: 0,
      paddingTop: 0,
    },
    content: {
      padding: 0,
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
