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
import { Ionicons } from "@expo/vector-icons";

import Text from "../Text/Text";

type CheckboxColors = {
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
  checkboxStyle?: ViewProps["style"];
  checkboxColors?: CheckboxColors;
  iconColor?: string;
};

export default function Checkbox(props: Props) {
  const theme = useTheme();
  const styles = checkboxStyle(
    theme,
    !!props.value,
    !!props.disabled,
    props.checkboxColors,
  );

  const iconColor = () => {
    if (props.disabled) {
      return theme.colors.gray11;
    }

    if (props.iconColor) {
      return props.iconColor;
    }

    return theme.colors.background;
  };

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
        testID="checkbox"
        style={[styles.checkbox_container, props.checkboxStyle]}
        activeOpacity={0.8}
        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
        disabled={props.disabled}
        onPress={() => {
          Platform.OS === "ios" &&
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch((e) =>
              console.error(e),
            );
          props.onChange && props.onChange(!props.value);
        }}
      >
        {props.value && (
          <View testID="checkbox-icon">
            <Ionicons name="checkmark" size={15} color={iconColor()} />
          </View>
        )}
      </TouchableOpacity>
      {renderLabel()}
    </View>
  );
}

const checkboxStyle = (
  theme: Theme,
  value: boolean,
  disabled: boolean,
  checkboxColors?: CheckboxColors,
) => {
  const backgroundColor = () => {
    if (disabled) {
      return theme.colors.gray03;
    }

    if (value && checkboxColors?.background?.true) {
      return checkboxColors.background.true;
    }

    if (!value && checkboxColors?.background?.false) {
      return checkboxColors.background.false;
    }

    if (value) {
      return theme.colors.gray12;
    }
    return theme.colors.transparent;
  };

  const borderColor = () => {
    if (disabled) {
      return theme.colors.gray11;
    }

    if (value && checkboxColors?.border?.true) {
      return checkboxColors.border.true;
    }

    if (!value && checkboxColors?.border?.false) {
      return checkboxColors.border.false;
    }

    if (value) {
      return theme.colors.gray12;
    }
    return theme.colors.gray12;
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.s,
    },
    checkbox_container: {
      width: 22,
      height: 22,
      borderRadius: 4,
      borderWidth: 1.2,
      borderColor: borderColor(),
      backgroundColor: backgroundColor(),
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return styles;
};
