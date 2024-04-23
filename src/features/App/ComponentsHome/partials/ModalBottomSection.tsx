import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "@/src/components/Button/Button";
import ModalBottom from "@/src/components/ModalBottom/ModalBottom";
import Text from "@/src/components/Text/Text";
import TextInput from "@/src/components/TextInput/TextInput";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function ModalBottomSection() {
  const theme = useTheme();
  const styles = modalBottomStyles(theme);

  const [text, setText] = useState("");

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  return (
    <View style={styles.modal_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        ModalBottom
      </Text>
      <Button
        onPress={() => {
          bottomSheetModalRef.current?.present();
        }}
      >
        Open ModalBottom
      </Button>
      <ModalBottom ref={bottomSheetModalRef} snapPoints={["20%"]}>
        <View style={styles.modal_content}>
          <Text>ModalBottom with TextInput</Text>
          <TextInput
            placeholder="Placeholder"
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

const modalBottomStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    modal_container: {
      width: "100%",
      marginBottom: theme.spacing.m,
    },
    modal_content: {
      padding: theme.spacing.m,
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
