import * as Haptics from "expo-haptics";
import { Platform, Pressable, StyleSheet, ViewProps } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useTheme, useThemeSettings } from "@/src/context/theme";

type Props = {
  thumbStyle?: ViewProps["style"];
  trackStyle?: ViewProps["style"];
  style?: ViewProps["style"];
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  trackColor?: {
    false?: string;
    true?: string;
  };
  thumbColor?: {
    false?: string;
    true?: string;
  };
};
const PADDING = 2;
const THUMB_SIZE = 27;
const TRACK_SIZE = 50;

export default function Switch(props: Props) {
  const theme = useTheme();
  const { isDarkTheme } = useThemeSettings();
  const styles = switchStyle();
  const thumbWidth = useSharedValue(0);
  const thumbPosition = useSharedValue(props.value ? 1 : 0);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      thumbPosition.value,
      [0, 1],
      [
        props.trackColor?.false ?? theme.colors.gray07,
        props.trackColor?.true
          ? props.trackColor.true
          : isDarkTheme
            ? theme.colors.green11
            : theme.colors.green08,
      ],
    );

    return {
      backgroundColor: withTiming(backgroundColor),
    };
  });

  const animatedThumbStyle = useAnimatedStyle(() => {
    const width = interpolate(thumbWidth.value, [0, 1], [27, 32], "clamp");
    const position = interpolate(
      thumbPosition.value,
      [0, 1],
      [0, TRACK_SIZE - width - PADDING * 2],
      "clamp",
    );

    const backgroundColor = interpolateColor(
      thumbPosition.value,
      [0, 1],
      [
        props.disabled
          ? theme.colors.gray10
          : props.thumbColor?.false ?? theme.colors.white,
        props.disabled
          ? theme.colors.gray10
          : props.thumbColor?.true ?? theme.colors.white,
      ],
    );

    return {
      width: withTiming(width, { duration: 200 }),
      transform: [{ translateX: withTiming(position, { duration: 200 }) }],
      backgroundColor: withTiming(backgroundColor, { duration: 200 }),
    };
  });

  return (
    <Pressable
      style={[styles.switch_container, props.style]}
      disabled={props.disabled}
      onLongPress={() => (thumbWidth.value = 1)}
      delayLongPress={100}
      onPressOut={() => {
        Platform.OS === "ios" &&
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch((e) =>
            console.error(e),
          );
        props.onValueChange && props.onValueChange(!props.value);
        thumbWidth.value = 0;
        thumbPosition.value = props.value ? 0 : 1;
      }}
      testID="switch"
    >
      <Animated.View
        style={[animatedContainerStyle, styles.container, props.trackStyle]}
      >
        <Animated.View
          style={[animatedThumbStyle, styles.thumb, props.thumbStyle]}
        />
      </Animated.View>
    </Pressable>
  );
}

const switchStyle = () => {
  const styles = StyleSheet.create({
    switch_container: {
      alignSelf: "flex-start",
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      width: TRACK_SIZE,
      padding: PADDING,
      borderRadius: THUMB_SIZE,
    },
    thumb: {
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      borderRadius: THUMB_SIZE / 2,
    },
  });

  return styles;
};
