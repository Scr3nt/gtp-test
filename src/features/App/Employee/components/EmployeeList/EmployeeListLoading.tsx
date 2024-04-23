import { StyleSheet, View } from "react-native";

import Separator from "@/src/components/Separator/Separator";
import Skeleton from "@/src/components/Skeleton/Skeleton";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function EmployeeListLoading() {
  const theme = useTheme();
  const styles = employeeListLoadingStyles(theme);
  return (
    <View style={{ gap: theme.spacing.s }}>
      {Array.from({ length: 15 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View style={styles.container} key={index}>
          <Separator />
          <View style={styles.content}>
            <>
              <Skeleton type="circle" width={40} height={40} />
              <View style={styles.text_container}>
                <Skeleton type="text" width={50} />
                <Skeleton type="text" />
              </View>
            </>
          </View>
        </View>
      ))}
    </View>
  );
}

const employeeListLoadingStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing.s,
    },
    content: {
      flexDirection: "row",
      gap: theme.spacing.s,
      alignItems: "center",
      paddingHorizontal: theme.spacing.m,
    },
    text_container: {
      gap: theme.spacing.xs,
    },
  });

  return styles;
};
