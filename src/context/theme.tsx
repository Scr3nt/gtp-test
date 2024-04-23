import * as SystemUI from "expo-system-ui";
import { ReactNode, createContext, useContext, useState } from "react";
import { Appearance, Platform } from "react-native";

import { storage } from "../const";
import { storageKeys } from "../storageKeys";
import { DarkTheme, LightTheme } from "../theme/theme";

type Props = {
  children?: ReactNode;
  getDarkTheme?: (value: boolean) => void;
};

type ThemeContextType = {
  isDarkTheme: boolean;
  toogleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  toogleTheme: () => null,
});

export function useThemeSettings() {
  return useContext(ThemeContext);
}

export function useTheme() {
  const { isDarkTheme } = useThemeSettings();
  if (isDarkTheme) {
    return DarkTheme;
  }
  return LightTheme;
}

export function ThemeProvider(props: Props) {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    !!storage.getBoolean(storageKeys.ISDARKTHEME),
  );

  if (isDarkTheme) {
    if (Platform.OS === "web") {
      SystemUI.setBackgroundColorAsync(DarkTheme.colors.background).catch((e) =>
        console.error(e),
      );
    }
    if (Platform.OS !== "web") {
      Appearance.setColorScheme("dark");
    }
  } else {
    if (Platform.OS === "web") {
      SystemUI.setBackgroundColorAsync(LightTheme.colors.background).catch(
        (e) => console.error(e),
      );
    }
    if (Platform.OS !== "web") {
      Appearance.setColorScheme("light");
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        toogleTheme: () => {
          if (isDarkTheme) {
            storage.delete(storageKeys.ISDARKTHEME);
            props.getDarkTheme && props.getDarkTheme(false);
            setIsDarkTheme(false);
            return;
          }
          storage.set(storageKeys.ISDARKTHEME, true);
          props.getDarkTheme && props.getDarkTheme(true);
          setIsDarkTheme(true);
        },
        isDarkTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
