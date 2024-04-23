import { Keyboard, Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";

export default function ModalBottomBackdrop({
  animatedIndex,
  onPressBackdrop,
  isKeyboardVisible,
}: BottomSheetBackdropProps & {
  onPressBackdrop: () => void;
  isKeyboardVisible: boolean;
}) {
  const theme = useTheme();
  const styles = modalStyle(theme);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedIndex.value,
      [-1, 0],
      [theme.colors.transparent, theme.colors.backdrop],
    );
    return {
      backgroundColor,
    };
  });

  return (
    <Pressable
      style={StyleSheet.absoluteFillObject}
      onPress={!isKeyboardVisible ? onPressBackdrop : Keyboard.dismiss}
    >
      <Animated.View style={[styles.backdrop, animatedStyle]} />
    </Pressable>
  );
}

const modalStyle = (theme: Theme) => {
  const styles = StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.backdrop,
    },
  });
  return styles;
};
