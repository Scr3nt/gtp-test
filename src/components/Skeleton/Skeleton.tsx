import { useEffect } from "react";
import { StyleSheet, ViewProps } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useTheme } from "@/src/context/theme";
import { useSkeletonAnimation } from "@/src/hooks/Skeleton/useSkeletonAnimation";
import { Theme } from "@/src/theme/theme";

type SkeletonType =
  | "circle"
  | "square"
  | "button"
  | "text"
  | "textinput"
  | "pill"
  | "card";

type Props = ViewProps & {
  height?: number;
  width?: number;
  radius?: number;
  style?: ViewProps["style"];
  type?: SkeletonType;
};

export default function Skeleton(props: Props) {
  const theme = useTheme();
  const styles = skeletonStyle(
    props.height ?? 0,
    props.width ?? 0,
    props.radius ?? 0,
    theme,
  );
  const { infiniteValue, startAnimation } = useSkeletonAnimation();

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const skeletonAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(infiniteValue.value, [0, 1], [0.5, 1]);

    return { opacity };
  });

  const styleMap = {
    circle: styles.skeleton_circle,
    square: styles.skeleton,
    button: styles.skeleton_button,
    text: styles.skeleton_text,
    textinput: styles.skeleton_button,
    pill: styles.skeleton_pill,
    card: styles.skeleton_card,
  };

  const skeletonStyleType = styleMap[props.type || "square"];

  return (
    <Animated.View
      {...props}
      style={[skeletonStyleType, props.style, skeletonAnimatedStyle]}
    />
  );
}

const skeletonStyle = (
  height: number,
  width: number,
  radius: number,
  theme: Theme,
) => {
  const styles = StyleSheet.create({
    skeleton: {
      height: height === 0 ? 50 : height,
      width: width === 0 ? 50 : width,
      borderRadius: radius,
      backgroundColor: theme.colors.gray07,
    },
    skeleton_circle: {
      height: height === 0 ? 50 : height,
      width: width === 0 ? 50 : width,
      borderRadius: width === 0 ? 50 : width / 2,
      backgroundColor: theme.colors.gray07,
    },
    skeleton_button: {
      height: height === 0 ? 45 : height,
      width: width === 0 ? "100%" : width,
      borderRadius: radius === 0 ? 8 : radius,
      backgroundColor: theme.colors.gray07,
    },
    skeleton_text: {
      height: height === 0 ? 15 : height,
      width: width === 0 ? 100 : width,
      borderRadius: radius === 0 ? 4 : radius,
      backgroundColor: theme.colors.gray07,
    },
    skeleton_pill: {
      height: height === 0 ? 22 : height,
      width: width === 0 ? 40 : width,
      borderRadius: radius === 0 ? 10 : radius,
      backgroundColor: theme.colors.gray07,
    },
    skeleton_card: {
      height: height === 0 ? 100 : height,
      width: width === 0 ? "100%" : width,
      borderRadius: radius === 0 ? 8 : radius,
      backgroundColor: theme.colors.gray07,
    },
  });
  return styles;
};
