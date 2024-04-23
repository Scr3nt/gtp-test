import { StyleSheet, View } from "react-native";

import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function TextSection() {
  const theme = useTheme();
  const styles = textStyles(theme);
  return (
    <View style={styles.text_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Text
      </Text>
      <Text preset="title01">Title01</Text>
      <Text preset="title02">Title02</Text>
      <Text preset="title03">Title03</Text>
      <Text preset="subtitle">Subtitle</Text>
      <Text preset="body">Body</Text>
      <Text preset="caption">Caption</Text>
    </View>
  );
}

const textStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    text_container: {
      alignSelf: "flex-start",
      marginBottom: theme.spacing.m,
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
