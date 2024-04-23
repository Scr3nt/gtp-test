import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Switch from "@/src/components/Switch/Switch";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function SwitchSection() {
  const theme = useTheme();
  const styles = switchStyles(theme);

  const [switchValue, setSwitchValue] = useState(true);
  const [switchValue2, setSwitchValue2] = useState(true);
  const [switchValue3, setSwitchValue3] = useState(false);

  return (
    <View style={styles.switch_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Switch
      </Text>
      <Switch
        style={styles.space_bottom}
        value={switchValue}
        onValueChange={(value) => setSwitchValue(value)}
      />
      <Switch
        style={styles.space_bottom}
        value={switchValue2}
        onValueChange={(value) => setSwitchValue2(value)}
        trackColor={{
          true: theme.colors.blue03,
          false: theme.colors.orange03,
        }}
        thumbColor={{
          true: theme.colors.blue11,
          false: theme.colors.orange11,
        }}
      />

      <Switch
        disabled
        value={switchValue3}
        onValueChange={(value) => setSwitchValue3(value)}
      />
    </View>
  );
}

const switchStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    switch_container: {
      alignSelf: "flex-start",
      marginBottom: theme.spacing.m,
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
