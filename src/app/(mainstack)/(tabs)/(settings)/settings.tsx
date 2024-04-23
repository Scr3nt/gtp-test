import { StatusBar } from "expo-status-bar";

import Button from "@/src/components/Button/Button";
import Page from "@/src/components/Page/Page";
import { useTheme, useThemeSettings } from "@/src/context/theme";
import { supabase } from "@/src/lib/supabase";

export default function SettingsPage() {
  const theme = useTheme();
  const themeContext = useThemeSettings();
  return (
    <Page style={{ gap: theme.spacing.m }}>
      <StatusBar style={theme.colors.statusbar} />
      <Button
        onPress={() => {
          supabase.auth.signOut().catch((e) => console.error(e));
        }}
      >
        Déconnexion
      </Button>
      <Button
        onPress={() => {
          themeContext.toogleTheme();
        }}
      >
        Changer le thème
      </Button>
    </Page>
  );
}
