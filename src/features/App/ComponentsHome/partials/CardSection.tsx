import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import Card from "@/src/components/Card/Card";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";

export default function CardSection() {
  const theme = useTheme();
  const styles = cardStyles(theme);
  return (
    <View style={styles.card_container}>
      <Text style={styles.space_bottom} preset="title01" type="bold">
        Card
      </Text>
      <Card style={[styles.card_content, styles.space_bottom]} />
      <Card>
        <Image
          alt="random image"
          source={{
            uri: "https://source.unsplash.com/random/?cities,night",
          }}
          style={styles.image}
        />
        <View style={styles.card_content}>
          <Text style={styles.space_bottom} preset="title03" type="bold">
            Lorem ipsum
          </Text>
          <Text preset="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          </Text>
        </View>
      </Card>
    </View>
  );
}

const cardStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    card_container: {
      width: "100%",
      marginBottom: theme.spacing.m,
    },
    card_content: {
      padding: theme.spacing.m,
    },
    image: {
      width: "100%",
      height: 120,
    },
    space_bottom: {
      marginBottom: theme.spacing.s,
    },
  });
  return styles;
};
