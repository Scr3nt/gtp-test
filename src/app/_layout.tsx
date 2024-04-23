import { FontSource, useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import Head from "expo-router/head";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "@/src/context/auth";
import { ThemeProvider } from "@/src/context/theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { ToastProvider } from "../components/Toast";

type Font = {
  [key: string]: FontSource;
};

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync().catch(console.error);

export default function Root() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Black": require("@/assets/fonts/Inter-Black.ttf") as Font,
    "Inter-Bold": require("@/assets/fonts/Inter-Bold.ttf") as Font,
    "Inter-ExtraBold": require("@/assets/fonts/Inter-ExtraBold.ttf") as Font,
    "Inter-ExtraLight": require("@/assets/fonts/Inter-ExtraLight.ttf") as Font,
    "Inter-Light": require("@/assets/fonts/Inter-Light.ttf") as Font,
    "Inter-Medium": require("@/assets/fonts/Inter-Medium.ttf") as Font,
    "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf") as Font,
    "Inter-SemiBold": require("@/assets/fonts/Inter-SemiBold.ttf") as Font,
    "Inter-Thin": require("@/assets/fonts/Inter-Thin.ttf") as Font,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // setTimeout is used to not show the first screen for a short time. (temporary until expo-router fixes this issue)
      setTimeout(() => {
        SplashScreen.hideAsync().catch(console.error);
      }, 1500);
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ToastProvider>
          <BottomSheetModalProvider>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <AuthProvider>
                <QueryClientProvider client={queryClient}>
                  {/* If you want to use on mobile, follow the Expo Head docs. */}
                  {Platform.OS === "web" && (
                    <Head>
                      <title>Blitz</title>
                      <meta
                        name="description"
                        content="Blitz - React Native Boilerplate"
                      />
                    </Head>
                  )}
                  <Stack screenOptions={{ headerShown: false }} />
                </QueryClientProvider>
              </AuthProvider>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </ToastProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
