/* eslint-disable react-native/no-inline-styles */
import { router } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";
import { Ionicons } from "@expo/vector-icons";

import Text from "../Text/Text";

type Props = ViewProps & {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  leftGoBack?: boolean;
};

export default function Header(props: Props) {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const styles = headerStyle(theme, safeAreaInsets);

  const renderLeft = () => {
    if (props.leftGoBack) {
      return (
        <View testID="left-goback">
          <TouchableOpacity activeOpacity={0.8} onPress={router.back}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      );
    }
    if (props.leftComponent) {
      return props.leftComponent;
    }
    return null;
  };

  const renderMiddle = () => {
    if (props.children && typeof props.children === "string") {
      return <Text type="medium">{props.children}</Text>;
    }

    if (props.children) {
      return props.children;
    }
    return null;
  };

  const renderRight = () => {
    if (props.rightComponent) {
      return props.rightComponent;
    }
    return null;
  };

  const itemStyle = () => {
    if (renderLeft() || renderRight()) {
      return styles.item;
    }
    return null;
  };

  return (
    <View style={[styles.container, props.style]}>
      <View style={[itemStyle(), styles.start]}>{renderLeft()}</View>
      <View style={[{ flex: 3 }, styles.center]}>{renderMiddle()}</View>
      <View style={[itemStyle(), styles.end]}>{renderRight()}</View>
    </View>
  );
}

const headerStyle = (theme: Theme, insets: EdgeInsets) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: theme.spacing.m,
      paddingTop: insets.top === 0 ? theme.spacing.m : insets.top,
      paddingBottom: theme.spacing.m,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray07,
    },
    item: {
      flex: 1,
    },
    center: {
      alignItems: "center",
    },
    start: {
      alignItems: "flex-start",
    },
    end: {
      alignItems: "flex-end",
    },
  });
  return styles;
};
