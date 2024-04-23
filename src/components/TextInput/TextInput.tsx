import { ReactNode, useMemo, useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput as TI,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

import Text, { TextType } from "../Text/Text";

type Props = TextInputProps & {
  label?: ReactNode;
  hint?: string;
  error?: string;
  disabled?: boolean;
  format?: "number" | "phone";
  onDelete?: () => void;
  inputStyle?: TextInputProps["style"];
  showHidePasswordButton?: boolean;
  type?: TextType;
};

const DELETE_BUTTON_SIZE = 17;

export default function TextInput(props: Props) {
  const theme = useTheme();

  const fontFamily = useMemo(() => {
    switch (props.type) {
      case "thin":
        return theme.fontFamily.thin;
      case "extra-light":
        return theme.fontFamily.extraLight;
      case "light":
        return theme.fontFamily.light;
      case "regular":
        return theme.fontFamily.regular;
      case "medium":
        return theme.fontFamily.medium;
      case "semi-bold":
        return theme.fontFamily.semiBold;
      case "bold":
        return theme.fontFamily.bold;
      case "extra-bold":
        return theme.fontFamily.extraBold;
      case "black":
        return theme.fontFamily.black;
      default:
        return theme.fontFamily.regular;
    }
  }, [props.type, theme.fontFamily]);

  const styles = textInputStyles(
    theme,
    !!props.error,
    !!props.disabled,
    !!props.onDelete,
    !!props.showHidePasswordButton,
    fontFamily,
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(
    !!props.secureTextEntry,
  );

  const formatText = (text: string | undefined) => {
    if (text && text?.length) {
      if (text && props.format === "number" && text.length > 3) {
        return text.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
      if (text && props.format === "phone" && text.length > 2) {
        return text
          .replace(/\s/g, "")
          .replace(/(\d{2})(?=\d)/g, "$1 ")
          .trim();
      }
      return text;
    }
    return "";
  };

  const actionButton = () => {
    if (
      props.onDelete &&
      !props.showHidePasswordButton &&
      props.value !== (undefined || "") &&
      props.defaultValue !== (undefined || "")
    ) {
      return (
        <TouchableOpacity
          testID="delete-button"
          activeOpacity={0.8}
          style={styles.delete_button_container}
          onPress={props.onDelete}
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
        >
          <Ionicons
            name="close-circle"
            size={DELETE_BUTTON_SIZE}
            color={theme.colors.gray11}
          />
        </TouchableOpacity>
      );
    }

    if (props.showHidePasswordButton) {
      return (
        <TouchableOpacity
          testID="eye-button"
          activeOpacity={0.8}
          style={[styles.delete_button_container]}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
        >
          {isPasswordVisible ? (
            <Ionicons
              name="eye"
              size={DELETE_BUTTON_SIZE}
              color={theme.colors.gray11}
            />
          ) : (
            <Ionicons
              name="eye-off"
              size={DELETE_BUTTON_SIZE}
              color={theme.colors.gray11}
            />
          )}
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View style={props.style}>
      {!!props.label && (
        <Text preset="caption" style={styles.label}>
          {props.label}
        </Text>
      )}
      <View>
        <TI
          {...props}
          style={[
            styles.container,
            props.multiline && styles.container_multiline,
            props.inputStyle,
          ]}
          placeholder={props.placeholder}
          placeholderTextColor={theme.colors.gray10}
          secureTextEntry={isPasswordVisible}
          onChangeText={(text) => {
            if (props.onChangeText) {
              props.onChangeText(formatText(text));
            }
          }}
          editable={!props.disabled}
        />
        {!props.multiline && (
          <View style={styles.action_button_container}>{actionButton()}</View>
        )}
      </View>
      {(!!props.hint || !!props.error) && (
        <View style={styles.indicator_container}>
          {!!props.hint && (
            <Text style={styles.hint} preset="caption">
              {props.hint}
            </Text>
          )}
          {!!props.error && (
            <Text style={styles.error} preset="caption">
              {props.error}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const textInputStyles = (
  theme: Theme,
  error: boolean,
  disabled: boolean,
  delete_button: boolean,
  eye_button: boolean,
  type: string,
) => {
  const PADDING_VERTICAL = theme.spacing.s;
  const PADDING_HORIZONTAL = 12;

  const textColor = () => {
    if (disabled) {
      return theme.colors.gray11;
    }
    if (error) {
      return theme.colors.red11;
    }
    return theme.colors.text;
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.gray03,
      borderColor: theme.colors.gray03,
      width: "100%",
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical:
        Platform.OS === "android" ? PADDING_VERTICAL - 4 : PADDING_VERTICAL,
      paddingHorizontal: PADDING_HORIZONTAL,
      paddingRight: delete_button
        ? DELETE_BUTTON_SIZE + PADDING_HORIZONTAL * 2
        : 0,
      fontSize: theme.fontSize.body,
      fontFamily: type,
      color: textColor(),
      includeFontPadding: false,
    },
    container_multiline: {
      minHeight: 100,
      paddingTop: PADDING_VERTICAL + 1,
      verticalAlign: "top",
    },
    label: {
      marginBottom: theme.spacing.xs,
      fontFamily: type,
      color: textColor(),
    },
    indicator_container: {
      marginTop: theme.spacing.xs,
    },
    hint: {
      color: disabled ? theme.colors.gray11 : theme.colors.gray10,
      fontFamily: type,
    },
    error: {
      color: disabled ? theme.colors.gray11 : theme.colors.red11,
      fontFamily: type,
    },
    action_button_container: {
      position: "absolute",
      width: DELETE_BUTTON_SIZE + PADDING_HORIZONTAL,
      height: "100%",
      alignSelf: "flex-end",
      justifyContent: "center",
    },
    delete_button_container: {
      height: DELETE_BUTTON_SIZE,
      width: DELETE_BUTTON_SIZE,
      borderRadius: DELETE_BUTTON_SIZE / 2,
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: eye_button ? 0 : 0.5,
    },
  });
  return styles;
};
