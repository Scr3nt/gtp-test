import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Button from "../Button/Button";
import Text from "../Text/Text";
import TextInput from "../TextInput/TextInput";
import ModalBottom from "./ModalBottom";

export default function ModalBottomTestPage() {
  const theme = useTheme();
  const styles = pageStyle(theme);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [text, setText] = useState("");
  return (
    <View style={styles.modal_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Modal
      </Text>
      <Button
        onPress={() => {
          bottomSheetModalRef.current?.present();
        }}
      >
        Open modal bottom
      </Button>
      <ModalBottom ref={bottomSheetModalRef} snapPoints={["25%"]}>
        <View style={styles.modal_content}>
          <Text>Modal with input at bottom</Text>
          <TextInput
            defaultValue={text}
            onChangeText={(textValue: string) => setText(textValue)}
            onDelete={() => setText("")}
            style={styles.space_bottom}
          />
        </View>
      </ModalBottom>
    </View>
  );
}

const pageStyle = (theme: Theme) => {
  const styles = StyleSheet.create({
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
    modal_container: {
      width: "100%",
      marginBottom: theme.spacing.m,
    },
    modal_content: {
      justifyContent: "space-between",
      flex: 1,
      padding: theme.spacing.m,
      paddingBottom: theme.spacing.xxl,
    },
  });
  return styles;
};
