import { StyleSheet, View } from "react-native";

import Separator from "@/src/components/Separator/Separator";
import Skeleton from "@/src/components/Skeleton/Skeleton";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function TasksListLoading() {
  const theme = useTheme();
  const styles = tasksListLoadingStyles(theme);
  return (
    <View style={{ gap: theme.spacing.s }}>
      {Array.from({ length: 15 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={index} style={styles.content}>
          <Separator />
          <View style={styles.text_container}>
            <Skeleton type="text" />
            <Skeleton type="text" width={50} />
          </View>
        </View>
      ))}
    </View>
  );
}

const tasksListLoadingStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    content: {
      gap: theme.spacing.s,
    },
    text_container: {
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.m,
    },
  });

  return styles;
};
