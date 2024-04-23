import { StyleSheet, View } from "react-native";

import Card from "@/src/components/Card/Card";
import Header from "@/src/components/Header/Header";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function HeaderSection() {
  const theme = useTheme();
  const styles = headerStyles(theme);
  return (
    <View style={styles.header_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Header
      </Text>
      <Card style={styles.card}>
        <Header style={styles.space_bottom}>Header</Header>
        <Header style={[styles.header_custom, styles.space_bottom]}>
          <Text type="bold" style={styles.header_custom_text}>
            Header custom
          </Text>
        </Header>
        <Header style={styles.space_bottom} leftGoBack>
          Header
        </Header>
        <Header
          rightComponent={<Text>Right</Text>}
          leftComponent={<Text>Left</Text>}
          style={styles.space_bottom}
        >
          Header
        </Header>
        <Header style={styles.space_bottom} rightComponent={<Text>Right</Text>}>
          Header
        </Header>
        <Header leftComponent={<Text>Left</Text>}>Header</Header>
      </Card>
    </View>
  );
}

const headerStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    header_container: {
      width: "100%",
      marginBottom: theme.spacing.m,
    },
    card: {
      padding: theme.spacing.m,
    },
    header_custom: {
      backgroundColor: theme.colors.blue03,
    },
    header_custom_text: {
      color: theme.colors.blue11,
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
