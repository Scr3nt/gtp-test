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

export default function Error(props: Props) {
  const theme = useTheme();
  const styles = errorStyle(theme);
  const { infiniteValue, startAnimation } = useSkeletonAnimation();

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const iconAnimatedStyle = useAnimatedStyle(() => {
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
        <Text style={props.onRefresh && styles.text}>
          An error has occurred
        </Text>
      </>
    );
  };

  return (
    <View testID="error" style={[styles.container, props.style]}>
      <Animated.View style={[styles.mark_container, iconAnimatedStyle]}>
        <Animated.View style={[styles.tall_circle]} />
        <Animated.View style={[styles.circle]} />
      </Animated.View>
      {renderChildren()}
      {props.onRefresh && <Button onPress={props.onRefresh}>Try again</Button>}
    </View>
  );
}

const errorStyle = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    mark_container: {
      marginBottom: theme.spacing.l,
      borderWidth: 10,
      height: 80,
      width: 80,
      borderRadius: 80,
      justifyContent: "center",
      alignItems: "center",
      padding: 50,
      borderColor: theme.colors.gray07,
    },
    tall_circle: {
      height: 50,
      width: 15,
      borderRadius: 15,
      marginBottom: theme.spacing.s,
      backgroundColor: theme.colors.gray07,
    },
    circle: {
      width: 15,
      height: 15,
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
