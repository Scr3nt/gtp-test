import { StyleSheet, View } from "react-native";

import Card from "@/src/components/Card/Card";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function StateManagerSection() {
  const theme = useTheme();
  const styles = stateManagerStyles(theme);
  return (
    <View style={styles.state_manager_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        StateManager
      </Text>
      <Card style={[styles.card]}>
        <Text type="semi-bold" style={styles.text}>
          {`import { State } from "@/src/components/StateManager/StateManager";

<State.Manager
  isSuccess={true}
  isLoading={false}
  isEmpty={false}
  isError={false}
>
  <State.Success>
    <Text>Success</Text>
  </State.Success>

  <State.Loading>
    <Text>Loading</Text>
  </State.Loading>

  <State.Empty>
    <Text>Empty</Text>
  </State.Empty>

  <State.Error>
    <Text>Error</Text>
  </State.Error>
</State.Manager>`}
        </Text>
      </Card>
    </View>
  );
}

const stateManagerStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    state_manager_container: {
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
