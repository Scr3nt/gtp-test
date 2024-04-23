import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Checkbox from "@/src/components/Checkbox/Checkbox";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function CheckboxSection() {
  const theme = useTheme();
  const styles = checkboxStyles(theme);

  const [checkboxValue, setCheckboxValue] = useState(true);
  const [checkboxValue2, setCheckboxValue2] = useState(true);
  const [checkboxValue3, setCheckboxValue3] = useState(true);

  return (
    <View style={styles.checkbox_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Checkbox
      </Text>
      <Checkbox
        value={checkboxValue}
        onChange={(value) => setCheckboxValue(value)}
        style={styles.space_bottom}
      />
      <Checkbox
        value={checkboxValue2}
        onChange={(value) => setCheckboxValue2(value)}
        label="Checkbox with label"
        style={styles.space_bottom}
      />
      <Checkbox
        value={checkboxValue3}
        onChange={(value) => setCheckboxValue3(value)}
        label={
          <Text
            type="bold"
            style={{
              color: checkboxValue3 ? theme.colors.blue11 : theme.colors.pink11,
            }}
          >
            Checkbox custom
          </Text>
        }
        checkboxColors={{
          border: {
            true: theme.colors.blue11,
            false: theme.colors.pink11,
          },
          background: {
            true: theme.colors.blue03,
            false: theme.colors.pink03,
          },
        }}
        iconColor={theme.colors.blue11}
        style={styles.checkbox_custom_container}
      />
      <Checkbox label="Checkbox with label & disabled" disabled />
    </View>
  );
}

const checkboxStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    checkbox_container: {
      width: "100%",
      marginBottom: theme.spacing.m,
    },
    checkbox_custom_container: {
      marginBottom: theme.spacing.s,
      justifyContent: "space-between",
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
