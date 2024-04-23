import { StyleSheet, View } from "react-native";

import Empty from "@/src/components/Empty/Empty";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function EmptySection() {
  const theme = useTheme();
  const styles = emptyStyles(theme);
  return (
    <View style={styles.empty_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Empty
      </Text>
      <Empty style={styles.space_bottom} />
      <Empty
        style={styles.space_bottom}
        onRefresh={() => {
          null;
        }}
      />
      <Empty
        onRefresh={() => {
          null;
        }}
      >
        <Text preset="title03" type="bold" style={styles.space_bottom}>
          Custom text
        </Text>
        <Text style={styles.space_bottom}>Custom text</Text>
      </Empty>
    </View>
  );
}

const emptyStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    empty_container: {
      width: "100%",
      marginBottom: theme.spacing.m,
      gap: theme.spacing.m,
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
