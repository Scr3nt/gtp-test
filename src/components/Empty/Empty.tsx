import { ReactNode, useEffect } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useTheme } from "@/src/context/theme";
import { useSkeletonAnimation } from "@/src/hooks/Skeleton/useSkeletonAnimation";
import { Theme } from "@/src/theme/theme";

import Button from "../Button/Button";
import Text from "../Text/Text";

type Props = {
  children?: ReactNode;
  onRefresh?: () => void;
  style?: ViewProps["style"];
};

export default function Empty(props: Props) {
  const theme = useTheme();
  const styles = emptyStyle(theme);
  const { infiniteValue, startAnimation } = useSkeletonAnimation();

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const skeletonAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(infiniteValue.value, [0, 1], [0.5, 1]);

    return { opacity };
  });

  const renderChildren = () => {
    if (props.children) {
      return props.children;
    }
    return (
      <>
        <Text type="bold" preset="title03" style={styles.title}>
          Oops
        </Text>
        <Text style={props.onRefresh && styles.text}>Nothing to show</Text>
      </>
    );
  };

  return (
    <View testID="empty" style={[styles.container, props.style]}>
      <View style={styles.circle_container}>
        <Animated.View style={[styles.circle, skeletonAnimatedStyle]} />
        <Animated.View style={[styles.circle, skeletonAnimatedStyle]} />
        <Animated.View style={[styles.circle, skeletonAnimatedStyle]} />
      </View>
      {renderChildren()}
      {props.onRefresh && <Button onPress={props.onRefresh}>Try again</Button>}
    </View>
  );
}

const emptyStyle = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    circle_container: {
      flexDirection: "row",
      gap: 10,
      marginBottom: theme.spacing.l,
    },
    circle: {
      width: 25,
      height: 25,
      borderRadius: 15,
      backgroundColor: theme.colors.gray07,
    },
    title: {
      marginBottom: theme.spacing.s,
    },
    text: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
