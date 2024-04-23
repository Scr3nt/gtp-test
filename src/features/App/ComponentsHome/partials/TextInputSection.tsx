import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Text from "@/src/components/Text/Text";
import TextInput from "@/src/components/TextInput/TextInput";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function TextInputSection() {
  const theme = useTheme();
  const styles = textStyles(theme);

  const [text, setText] = useState("");
  const [textPhone, setTextPhone] = useState("06 00 00 00 00");
  const [textNumber, setTextNumber] = useState("10 000 000");
  const [textPassword, setTextPassword] = useState("password");

  return (
    <View style={styles.textinput_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        TextInput
      </Text>
      <TextInput
        placeholder="Placeholder"
        value={text}
        onChangeText={(textValue: string) => setText(textValue)}
        onDelete={() => setText("")}
        style={styles.space_bottom}
      />
      <TextInput
        placeholder="Placeholder"
        value={textPassword}
        onChangeText={(textValue: string) => setTextPassword(textValue)}
        onDelete={() => setTextPassword("")}
        secureTextEntry
        showHidePasswordButton
        style={styles.space_bottom}
      />
      <TextInput
        placeholder="Placeholder"
        format="phone"
        value={textPhone}
        onChangeText={(textValue: string) => setTextPhone(textValue)}
        onDelete={() => setTextPhone("")}
        style={styles.space_bottom}
      />
      <TextInput
        placeholder="Placeholder"
        format="number"
        value={textNumber}
        onChangeText={(textValue: string) => setTextNumber(textValue)}
        onDelete={() => setTextNumber("")}
        style={styles.space_bottom}
      />
      <TextInput
        placeholder="Placeholder"
        style={styles.space_bottom}
        label="TextInput with label"
      />
      <TextInput
        placeholder="Placeholder"
        style={styles.space_bottom}
        label="TextInput with label & hint"
        hint="Hint"
      />
      <TextInput
        placeholder="Placeholder"
        style={styles.space_bottom}
        label="TextInput with label & error"
        error="Error"
      />
      <TextInput
        placeholder="Placeholder"
        style={styles.space_bottom}
        label="TextInput with label & hint & error"
        hint="Hint"
        error="Error"
      />
      <TextInput
        placeholder="Placeholder"
        style={styles.space_bottom}
        label="TextInput with label & multiline"
        multiline
      />
      <TextInput
        placeholder="Placeholder"
        label="TextInput with label, hint, error & disabled"
        disabled
        hint="Hint"
        error="Error"
      />
    </View>
  );
}

const textStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    textinput_container: {
      width: "100%",
      marginBottom: theme.spacing.m,
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
