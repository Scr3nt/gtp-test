import { StatusBar } from "expo-status-bar";

import Page from "@/src/components/Page/Page";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";

export default function CreateEmployeePage() {
  const theme = useTheme();
  return (
    <Page>
      <StatusBar style={theme.colors.statusbar} />
      <Text>CreateEmployeePage</Text>
    </Page>
  );
}
