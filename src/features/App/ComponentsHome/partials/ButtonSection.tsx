import { StyleSheet, View } from "react-native";

import Button from "@/src/components/Button/Button";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function ButtonSection() {
  const theme = useTheme();
  const styles = buttonStyles(theme);
  return (
    <View style={styles.button_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Button
      </Text>
      <Button style={styles.space_bottom} />
      <Button style={styles.custom_button}>
        <Text type="semi-bold" style={styles.button_text}>
          Button custom
        </Text>
      </Button>
      <Button style={styles.space_bottom} loading>
        Button
      </Button>
      <Button style={styles.space_bottom} outline>
        Button outline
      </Button>
      <Button style={styles.space_bottom} outline loading />
      <Button style={styles.space_bottom} disabled>
        Button disabled
      </Button>
      <Button style={styles.space_bottom} loading disabled />
      <Button style={styles.space_bottom} outline disabled>
        Button outline disabled
      </Button>
      <Button outline loading disabled />
    </View>
  );
}

const buttonStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    button_container: {
      marginBottom: theme.spacing.m,
      width: "100%",
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
    custom_button: {
      backgroundColor: theme.colors.blue03,
      marginBottom: theme.spacing.s,
    },
    button_text: {
      color: theme.colors.blue11,
    },
  });
  return styles;
};
