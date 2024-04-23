import { StyleSheet, View } from "react-native";

import Error from "@/src/components/Error/Error";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function ErrorSection() {
  const theme = useTheme();
  const styles = errorStyles(theme);
  return (
    <View style={styles.error_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Error
      </Text>
      <Error style={styles.space_bottom} />
      <Error
        style={styles.space_bottom}
        onRefresh={() => {
          null;
        }}
      />
      <Error
        onRefresh={() => {
          null;
        }}
      >
        <Text preset="title03" type="bold" style={styles.space_bottom}>
          Custom text
        </Text>
        <Text style={styles.space_bottom}>Custom text</Text>
      </Error>
    </View>
  );
}

const errorStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    error_container: {
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
