import { StyleSheet, View } from "react-native";

import Badge from "@/src/components/Badge/Badge";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function BadgeSection() {
  const theme = useTheme();
  const styles = badgeStyles(theme);
  return (
    <View style={styles.badge_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Badge
      </Text>
      <Badge style={styles.space_bottom}>Badge</Badge>
      <Badge style={styles.badge_custom}>
        <Text type="medium" style={styles.badge_custom_text}>
          Badge custom
        </Text>
      </Badge>
    </View>
  );
}

const badgeStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    badge_container: {
      alignSelf: "flex-start",
      marginBottom: theme.spacing.m,
    },
    badge_custom: {
      backgroundColor: theme.colors.blue03,
    },
    badge_custom_text: {
      color: theme.colors.blue11,
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
