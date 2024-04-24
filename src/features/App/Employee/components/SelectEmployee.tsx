import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Avatar from "@/src/components/Avatar/Avatar";
import Button from "@/src/components/Button/Button";
import Card from "@/src/components/Card/Card";
import Text from "@/src/components/Text/Text";
import { useTheme } from "@/src/context/theme";
import { Theme } from "@/src/theme/theme";
import { Ionicons } from "@expo/vector-icons";

const DELETE_BUTTON_SIZE = 17;

type SelectEmployeeProps = {
  onPressRemoveEmployee: () => void;
  employeeName: string;
};

export default function SelectEmployee({
  employeeName,
  onPressRemoveEmployee,
}: SelectEmployeeProps) {
  const theme = useTheme();
  const styles = selectEmployeeStyles(theme);
  return (
    <View style={{ gap: theme.spacing.s }}>
      <View style={{ gap: theme.spacing.xs }}>
        <Text preset="caption">Employé</Text>
        <Card style={styles.card}>
          {employeeName ? (
            <View style={styles.employee_container}>
              <View style={styles.employee_content}>
                <Avatar size={30} initials={employeeName.slice(0, 1)} />
                <Text type="semi-bold">{employeeName}</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.remove_employee_button}
                onPress={onPressRemoveEmployee}
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              >
                <Ionicons
                  name="close-circle"
                  size={DELETE_BUTTON_SIZE}
                  color={theme.colors.gray11}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.no_employee_text}>
              {"Aucun employé n'a été assigné"}
            </Text>
          )}
        </Card>
      </View>
      <Button
        onPress={() =>
          router.navigate({
            pathname: "/select_employee",
          })
        }
        style={styles.employee_button}
      >
        <Text
          style={styles.employee_button_text}
          preset="caption"
          type="semi-bold"
        >
          {"Assigner un employé"}
        </Text>
      </Button>
    </View>
  );
}

const selectEmployeeStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    card: {
      paddingVertical: theme.spacing.s,
      paddingHorizontal: 12,
    },
    employee_container: {
      flexDirection: "row",
      gap: theme.spacing.s,
      alignItems: "center",
      justifyContent: "space-between",
    },
    employee_content: {
      flexDirection: "row",
      gap: theme.spacing.s,
      alignItems: "center",
    },
    no_employee_text: {
      color: theme.colors.gray10,
    },
    employee_button: {
      alignSelf: "flex-start",
      backgroundColor: theme.colors.blue03,
    },
    employee_button_text: {
      color: theme.colors.blue11,
    },
    remove_employee_button: {
      height: DELETE_BUTTON_SIZE,
      width: DELETE_BUTTON_SIZE,
      borderRadius: DELETE_BUTTON_SIZE / 2,
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 0.5,
    },
  });

  return styles;
};
