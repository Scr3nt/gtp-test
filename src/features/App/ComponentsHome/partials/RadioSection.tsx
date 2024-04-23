import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Radio from "@/src/components/Radio/Radio";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function RadioSection() {
  const theme = useTheme();
  const styles = radioStyles(theme);

  const [radioValue, setRadioValue] = useState(true);
  const [radioValue2, setRadioValue2] = useState(true);
  const [radioValue3, setRadioValue3] = useState(true);

  return (
    <View style={styles.radio_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Radio
      </Text>
      <Radio
        value={radioValue}
        onChange={(value) => setRadioValue(value)}
        style={styles.space_bottom}
      />
      <Radio
        value={radioValue2}
        onChange={(value) => setRadioValue2(value)}
        label="Radio with label"
        style={styles.space_bottom}
      />
      <Radio
        value={radioValue3}
        onChange={(value) => setRadioValue3(value)}
        label={
          <Text
            type="bold"
            style={{
              color: radioValue3 ? theme.colors.blue11 : theme.colors.green11,
            }}
          >
            Radio custom
          </Text>
        }
        radioColors={{
          border: {
            true: theme.colors.blue11,
            false: theme.colors.green11,
          },
          background: {
            true: theme.colors.blue11,
            false: theme.colors.green11,
          },
        }}
        style={styles.radio_custom_container}
      />
      <Radio label="Radio with label & disabled" disabled />
    </View>
  );
}

const radioStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    radio_container: {
      width: "100%",
      marginBottom: theme.spacing.m,
    },
    radio_custom_container: {
      marginBottom: theme.spacing.s,
      justifyContent: "space-between",
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
