/* eslint-disable react/no-unstable-nested-components */
import { Tabs } from "expo-router";
import { useMemo } from "react";
import { Platform, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PHONE_WIDTH_BREAKPOINT, TABLET_WIDTH_BREAKPOINT } from "@/src/const";
import { useTheme } from "@/src/context/theme";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const ACTIVE_COLOR = theme.colors.blue11;
  const INACTIVE_COLOR = theme.colors.gray11;

  const ICON_SIZE = 25;
  const TAB_SIZE = 49 + insets.bottom;
  const FONT_SIZE = 10;

  const isPhone = useMemo(() => width <= PHONE_WIDTH_BREAKPOINT, [width]);
  const isTablet = useMemo(
    () => width > PHONE_WIDTH_BREAKPOINT && width <= TABLET_WIDTH_BREAKPOINT,
    [width],
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: TAB_SIZE,
          paddingTop: theme.spacing.xs,
          backgroundColor: theme.colors.background,
          flexDirection: "row",
          justifyContent: "space-around",
          borderTopWidth: 1,
          borderTopColor: theme.colors.gray07,
        },
        tabBarItemStyle: {
          height: "100%",
          alignItems: "center",
          justifyContent:
            isTablet || Platform.OS === "web" || !isPhone
              ? "center"
              : "flex-start",
        },
        tabBarIconStyle: {
          flex: 0,
          height: ICON_SIZE,
          width: ICON_SIZE,
          marginBottom:
            Platform.OS === "web" && !isPhone && width > 770
              ? theme.spacing.s
              : Platform.OS !== "web"
                ? theme.spacing.s
                : theme.spacing.m,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          lineHeight: FONT_SIZE,
          fontSize: FONT_SIZE,
          marginBottom:
            Platform.OS === "web" && !isPhone && width > 770
              ? theme.spacing.s
              : 0,
          fontFamily: theme.fontFamily.medium,
        },
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarActiveTintColor: ACTIVE_COLOR,
      }}
    >
      <Tabs.Screen
        name="(homepage)/home"
        options={{
          title: "Acceuil",

          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="home"
                size={ICON_SIZE}
                color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="(employee)/employee"
        options={{
          title: "Employés",
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="person"
                size={ICON_SIZE}
                color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="(settings)/settings"
        options={{
          title: "Paramètres",
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="settings"
                size={ICON_SIZE}
                color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
