import { Image, ImageProps, ImageStyle } from "expo-image";
import { StyleSheet, View } from "react-native";

import { useTheme, useThemeSettings } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";
import { Ionicons } from "@expo/vector-icons";

import Text from "../Text/Text";

type Props = ImageProps & {
  size?: number;
  initials?: string;
};

export default function Avatar(props: Props) {
  const theme = useTheme();
  const { isDarkTheme } = useThemeSettings();
  const styles = imageStyles(theme, props.size || 50, isDarkTheme);
  const renderImage = () => {
    if (!props.source && props.initials) {
      return (
        <View style={[styles.initials_container, props.style]}>
          <Text type="bold" style={styles.initials_text}>
            {props.initials.toUpperCase()}
          </Text>
        </View>
      );
    }

    if (!props.source && !props.initials) {
      return (
        <View testID="default" style={[styles.initials_container, props.style]}>
          <Ionicons
            name="person"
            size={props.size ? props.size / 2 : 25}
            color={theme.colors.white}
          />
        </View>
      );
    }

    return (
      <Image {...props} style={[styles.image, props.style as ImageStyle]} />
    );
  };

  return <>{renderImage()}</>;
}

const imageStyles = (theme: Theme, size: number, isDarkTheme: boolean) => {
  const styles = StyleSheet.create({
    image: {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    initials_container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: isDarkTheme ? theme.colors.gray11 : theme.colors.gray08,
      justifyContent: "center",
      alignItems: "center",
    },
    initials_text: {
      color: theme.colors.white,
      fontSize: size / 3,
      lineHeight: size,
    },
  });
  return styles;
};
