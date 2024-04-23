import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AvoidSoftInput } from "react-native-avoid-softinput";

import Page from "@/src/components/Page/Page";
import Text from "@/src/components/Text/Text";
import { useTheme, useThemeSettings } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

import { useAuth } from "../../../context/auth";
import AvatarSection from "./partials/AvatarSection";
import BadgeSection from "./partials/BadgeSection";
import ButtonSection from "./partials/ButtonSection";
import CardSection from "./partials/CardSection";
import CheckboxSection from "./partials/CheckboxSection";
import EmptySection from "./partials/EmptySection";
import ErrorSection from "./partials/ErrorSection";
import HeaderSection from "./partials/HeaderSection";
import LayoutManagerSection from "./partials/LayoutManagerSection";
import ModalBottomSection from "./partials/ModalBottomSection";
import RadioSection from "./partials/RadioSection";
import SkeletonSection from "./partials/SkeletonSection";
import StateManagerSection from "./partials/StateManagerSection";
import SwitchSection from "./partials/SwitchSection";
import TextInputSection from "./partials/TextInputSection";
import TextSection from "./partials/TextSection";
import ToastSection from "./partials/ToastSection";

export default function Home() {
  const authContext = useAuth();
  const theme = useTheme();
  const { toogleTheme } = useThemeSettings();

  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  const styles = pageStyle(theme);

  const signOut = () => {
    if (authContext && "signOut" in authContext) {
      authContext.signOut();
    }
  };

  return (
    <Page isScrollView contentContainerStyle={styles.container}>
      <StatusBar style={theme.colors.statusbar} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/other")}>
          <Text style={styles.text}>Go Other</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toogleTheme}>
          <Text style={styles.text}>Change theme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.text}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <TextSection />

      <ButtonSection />

      <TextInputSection />

      <AvatarSection />

      <CardSection />

      <BadgeSection />

      <SwitchSection />

      <CheckboxSection />

      <RadioSection />

      <ToastSection />

      <ModalBottomSection />

      <HeaderSection />

      <SkeletonSection />

      <EmptySection />

      <ErrorSection />

      <StateManagerSection />

      <LayoutManagerSection />
    </Page>
  );
}

const pageStyle = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      alignSelf: "flex-end",
    },
    text: {
      textAlign: "center",
      marginBottom: theme.spacing.xs,
    },
  });
  return styles;
};
