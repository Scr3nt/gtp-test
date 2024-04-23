import { StyleSheet, View } from "react-native";

import Card from "@/src/components/Card/Card";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function LayoutManagerSection() {
  const theme = useTheme();
  const styles = layoutManagerStyles(theme);
  return (
    <View style={styles.layout_manager_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        LayoutManager
      </Text>
      <Card style={[styles.card]}>
        <Text type="semi-bold" style={styles.text}>
          {`import LayoutManager from "@/src/components/LayoutManager/LayoutManager";

<LayoutManager
    phoneLayout={<Text>Phone Layout</Text>}
    tabletLayout={<Text>Tablet Layout</Text>}
    desktopLayout={<Text>Desktop Layout</Text>}
>`}
        </Text>
      </Card>
    </View>
  );
}

const layoutManagerStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    layout_manager_container: {
      width: "100%",
      marginBottom: theme.spacing.m,
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
    card: {
      backgroundColor: theme.colors.blue03,
      padding: theme.spacing.m,
    },
    text: {
      color: theme.colors.blue11,
    },
  });
  return styles;
};
