import { useCallback, useEffect } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";
import { Ionicons } from "@expo/vector-icons";

import Text from "../Text/Text";
import type { ToastType } from "./context";

type ToastProps = {
  index: number;
  toast: ToastType;
  onDismiss: (toastId: number) => void;
  onExpand: () => void;
  isExpanded: boolean;
};

const ToastOffset = 20;
const ToastHeight = 70;
const HideToastOffset = ToastOffset + ToastHeight;

const Toast = ({ toast, onDismiss, onExpand, isExpanded }: ToastProps) => {
  const theme = useTheme();
  const styles = toastStyles(theme);
  const safeArea = useSafeAreaInsets();

  const BaseSafeArea =
    toast.position === "top"
      ? safeArea.top + theme.spacing.m
      : safeArea.bottom + theme.spacing.m;
  const { width: windowWidth } = useWindowDimensions();

  const isActiveToast = toast.id === 0;

  const initialPosition = isActiveToast
    ? -HideToastOffset
    : BaseSafeArea + (toast.id > 2 ? 2 : toast.id - 1) * ToastOffset;

  const position = useSharedValue(initialPosition);

  useEffect(() => {
    if (isExpanded) {
      position.value = withTiming(
        BaseSafeArea +
          (toast.id > 2 ? 2 : toast.id) * ToastHeight +
          (toast.id > 2 ? 2 : toast.id) * theme.spacing.s,
      );
    } else {
      position.value = withTiming(
        BaseSafeArea + (toast.id > 2 ? 2 : toast.id) * ToastOffset,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast.id, isExpanded, theme.spacing.s]);

  const translateX = useSharedValue(0);
  const isSwiping = useSharedValue(false);

  const dismissItem = useCallback(() => {
    "worklet";

    translateX.value = withTiming(
      translateX.value > 50 ? windowWidth : -windowWidth,
      undefined,
      (isFinished) => {
        if (isFinished) {
          runOnJS(onDismiss)(toast.id);
        }
      },
    );
  }, [onDismiss, toast.id, translateX, windowWidth]);

  const gesture = Gesture.Pan()
    .enabled(isExpanded === true ? true : isActiveToast)
    .onBegin(() => {
      isSwiping.value = true;
    })
    .onUpdate((event) => {
      return (translateX.value = event.translationX);
    })
    .onEnd((event) => {
      isSwiping.value = false;
      if (event.translationX < -50 || event.translationX > 50) {
        dismissItem();
      } else {
        translateX.value = withSpring(0);
      }
    })
    .onFinalize(() => {
      isSwiping.value = false;
    });

  useEffect(() => {
    if (!toast.autodismiss || !isActiveToast) {
      return;
    }
    const timeout = setTimeout(() => {
      dismissItem();
    }, 2500);
    return () => {
      clearTimeout(timeout);
    };
  }, [dismissItem, isActiveToast, toast.autodismiss]);

  const rToastStyle = useAnimatedStyle(() => {
    const baseScale = isExpanded ? 1 : 1 - toast.id * 0.05;
    const scale = isSwiping.value ? baseScale * 0.96 : baseScale;
    const opacity = toast.id > 2 ? 0 : 1;

    if (toast.position === "top") {
      return {
        top: position.value,
        zIndex: 1000 - toast.id,
        opacity: withTiming(opacity, { duration: 500 }),
        transform: [
          {
            scale: withTiming(scale),
          },
          {
            translateX: translateX.value,
          },
        ],
      };
    }
    return {
      bottom: position.value,
      zIndex: 1000 - toast.id,
      opacity: withTiming(opacity, { duration: 500 }),
      transform: [
        {
          scale: withTiming(scale),
        },
        {
          translateX: translateX.value,
        },
      ],
    };
  }, [toast, isExpanded]);

  const rVisibleContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: isExpanded ? 1 : withTiming(toast.id <= 1 ? 1 : 0),
    };
  }, [toast.id, isExpanded]);

  const renderIcon = () => {
    if (toast.icon) {
      return (
        <Ionicons
          name={toast.icon?.name}
          size={toast.icon?.size || 20}
          color={
            (toast.icon?.color && theme.colors[toast.icon?.color]) ||
            theme.colors.text
          }
        />
      );
    }
    return;
  };

  return (
    <GestureDetector gesture={gesture}>
      <TouchableWithoutFeedback onPress={onExpand}>
        <Animated.View
          style={[
            {
              width: windowWidth - theme.spacing.m * 2,
              zIndex: 100 - toast.id,
            },
            styles.container,
            rToastStyle,
          ]}
        >
          <Animated.View style={styles.textContainer}>
            <Animated.View style={[rVisibleContainerStyle, styles.rowCenter]}>
              {renderIcon()}
              <View style={[styles.columnCenter]}>
                <Text numberOfLines={1} type="bold" style={styles.title}>
                  {toast.title}
                </Text>
                {toast.subtitle && (
                  <Text
                    numberOfLines={1}
                    preset="caption"
                    type="medium"
                    style={styles.subtitle}
                  >
                    {toast.subtitle}
                  </Text>
                )}
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </GestureDetector>
  );
};

const toastStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      height: ToastHeight,
      borderRadius: 16,
      borderWidth: 1,
      paddingHorizontal: theme.spacing.m,
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: theme.colors.background,
      left: theme.spacing.m,
      borderCurve: "continuous",
      borderColor: theme.colors.gray06,
    },
    rowCenter: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: theme.spacing.m / 2,
    },
    columnCenter: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
    },
    textContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    title: {
      color: theme.colors.text,
    },
    subtitle: {
      color: theme.colors.gray09,
    },
  });
  return styles;
};
export { Toast };
