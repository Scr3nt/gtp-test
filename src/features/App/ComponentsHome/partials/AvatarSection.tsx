import { StyleSheet, View } from "react-native";

import Avatar from "@/src/components/Avatar/Avatar";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function AvatarSection() {
  const theme = useTheme();
  const styles = avatarStyles(theme);
  return (
    <View style={styles.avatar_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Avatar
      </Text>
      <Avatar
        alt="avatar"
        source={"https://source.unsplash.com/random/?portrait"}
        style={styles.space_bottom}
        size={60}
      />
      <Avatar style={styles.space_bottom} />
      <Avatar initials="RN" />
    </View>
  );
}

const avatarStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    avatar_container: {
      width: "100%",
      marginBottom: theme.spacing.m,
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
