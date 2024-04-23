import { StyleSheet, View } from "react-native";

import Skeleton from "@/src/components/Skeleton/Skeleton";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function SkeletonSection() {
  const theme = useTheme();
  const styles = skeletonStyles(theme);
  return (
    <View style={styles.skeleton_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Skeleton
      </Text>
      <Skeleton style={styles.space_bottom} height={50} width={50} radius={8} />
      <Skeleton style={styles.space_bottom} type="square" />
      <Skeleton style={styles.space_bottom} type="circle" />
      <Skeleton style={styles.space_bottom} type="button" />
      <Skeleton style={styles.space_bottom} type="text" />
      <Skeleton style={styles.space_bottom} type="textinput" />
      <Skeleton style={styles.space_bottom} type="pill" />
      <Skeleton type="card" />
    </View>
  );
}

const skeletonStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    skeleton_container: {
      width: "100%",
      marginBottom: theme.spacing.m,
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
