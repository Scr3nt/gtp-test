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
      <Separator />
      <View style={styles.content}>
        <Skeleton type="text" />
        <Skeleton type="text" width={50} />
      </View>
      <Separator />
      <View style={styles.content}>
        <Skeleton type="text" />
        <Skeleton type="text" width={50} />
      </View>
      <Separator />
      <View style={styles.content}>
        <Skeleton type="text" />
        <Skeleton type="text" width={50} />
      </View>
    </View>
  );
}

const tasksListLoadingStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    content: {
      paddingHorizontal: theme.spacing.m,
      gap: theme.spacing.xs,
    },
  });

  return styles;
};
