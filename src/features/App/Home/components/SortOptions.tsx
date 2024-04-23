import { StyleSheet, View } from "react-native";

import Button from "@/src/components/Button/Button";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

type SortType = "title" | "start_hour" | "end_hour";

type Props = {
  sortType: SortType;
  onChangeSortType: (sort: SortType) => void;
};

export default function SortOptions(props: Props) {
  const theme = useTheme();
  const styles = sortOptionsStyles(theme);

  return (
    <View style={{ marginHorizontal: theme.spacing.m }}>
      <Text
        type="semi-bold"
        preset="caption"
        style={{
          color: theme.colors.text,
          marginBottom: theme.spacing.s,
        }}
      >
        Trier par
      </Text>
      <View style={styles.container}>
        <Button
          onPress={() => props.onChangeSortType("title")}
          style={[
            styles.button,
            props.sortType === "title" && styles.button_selected,
          ]}
        >
          <Text
            type="semi-bold"
            preset="caption"
            style={[
              styles.button_text,
              props.sortType === "title" && styles.button_text_selected,
            ]}
          >
            Libellé
          </Text>
        </Button>
        <Button
          onPress={() => props.onChangeSortType("start_hour")}
          style={[
            styles.button,
            props.sortType === "start_hour" && styles.button_selected,
          ]}
        >
          <Text
            type="semi-bold"
            preset="caption"
            style={[
              styles.button_text,
              props.sortType === "start_hour" && styles.button_text_selected,
            ]}
          >
            Heure de début
          </Text>
        </Button>
        <Button
          onPress={() => props.onChangeSortType("end_hour")}
          style={[
            styles.button,
            props.sortType === "end_hour" && styles.button_selected,
          ]}
        >
          <Text
            type="semi-bold"
            preset="caption"
            style={[
              styles.button_text,
              props.sortType === "end_hour" && styles.button_text_selected,
            ]}
          >
            Heure de fin
          </Text>
        </Button>
      </View>
    </View>
  );
}

const sortOptionsStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      gap: theme.spacing.s,
      marginBottom: theme.spacing.s,
    },
    button: {
      width: "auto",
      flex: 1,
      backgroundColor: theme.colors.gray03,
      paddingHorizontal: theme.spacing.s,
    },
    button_text: {
      color: theme.colors.gray11,
    },
    button_selected: {
      backgroundColor: theme.colors.text,
    },
    button_text_selected: {
      color: theme.colors.black,
    },
  });

  return styles;
};
