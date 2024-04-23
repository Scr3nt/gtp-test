import * as Haptics from "expo-haptics";
import { ReactNode } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

import Text from "../Text/Text";

type RadioColors = {
  border?: {
    false?: string;
    true?: string;
  };
  background?: {
    false?: string;
    true?: string;
  };
};

type Props = {
  label?: string | ReactNode;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
  value?: boolean;
  style?: ViewProps["style"];
  radioStyle?: ViewProps["style"];
  radioColors?: RadioColors;
};

export default function Radio(props: Props) {
  const theme = useTheme();
  const styles = radioStyle(
    theme,
    !!props.disabled,
    !!props.value,
    props.radioColors,
  );

  const renderLabel = () => {
    if (typeof props.label === "string") {
      return (
        <Text
          style={{
            color: props.disabled ? theme.colors.gray11 : theme.colors.text,
          }}
        >
          {props.label}
        </Text>
      );
    }

    return props.label;
  };

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        testID="radio"
        onPress={() => {
          Platform.OS === "ios" &&
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch((e) =>
              console.error(e),
            );
          props.onChange && props.onChange(!props.value);
        }}
        disabled={props.disabled}
        activeOpacity={0.8}
        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
      >
        <View style={[styles.radio, props.radioStyle]}>
          <View testID={"radio-icon"} style={styles.radioContent} />
        </View>
      </TouchableOpacity>
      {renderLabel()}
    </View>
  );
}

const radioStyle = (
  theme: Theme,
  disabled: boolean,
  value: boolean,
  radioColors?: RadioColors,
) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.s,
    },
    radio: {
      width: 22,
      height: 22,
      borderRadius: 12,
      borderWidth: 1.4,
      padding: 2,
      backgroundColor: disabled
        ? theme.colors.gray03
        : theme.colors.transparent,
      borderColor: disabled
        ? theme.colors.gray11
        : value
          ? radioColors?.border?.true ?? theme.colors.gray12
          : radioColors?.border?.false ?? theme.colors.gray12,
      justifyContent: "center",
      alignItems: "center",
    },
    radioContent: {
      width: value ? "100%" : "0%",
      height: value ? "100%" : "0%",
      borderRadius: value ? 20 : 0,
      backgroundColor:
        disabled && value
          ? theme.colors.gray11
          : disabled && !value
            ? theme.colors.gray03
            : value
              ? radioColors?.background?.true ?? theme.colors.gray12
              : radioColors?.background?.false ?? theme.colors.gray12,
    },
  });

  return styles;
};
