import { StyleSheet, View } from "react-native";

import Button from "@/src/components/Button/Button";
import Text from "@/src/components/Text/Text";
import { useToast } from "@/src/components/Toast";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function ToastSection() {
  const theme = useTheme();
  const toast = useToast();
  const styles = textStyles(theme);
  return (
    <View style={styles.toast_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Toast
      </Text>
      <Button
        style={styles.space_bottom}
        onPress={() => {
          toast.showToast({
            title: "Toast Title",
            subtitle: "Toast Subtitle",
            key: Math.random().toString(),
            icon: { name: "file-tray-full", size: 20, color: "red11" },
            autodismiss: false,
          });
        }}
      >
        Toast Bottom
      </Button>
    </View>
  );
}

const textStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    toast_container: {
      width: "100%",
      marginBottom: theme.spacing.m,
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
