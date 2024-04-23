import { ReactNode, createContext, useContext } from "react";

import { Theme } from "@/src/theme/theme";
import { Ionicons } from "@expo/vector-icons";

type ColorKeys = keyof Theme["colors"];

export type ToastType = {
  id: number;
  key: string;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  autodismiss?: boolean;
  position?: "top" | "bottom";
  icon?: {
    name: keyof typeof Ionicons.glyphMap;
    color?: ColorKeys;
    size?: number;
  };
  type?: "error" | "success" | "warning" | "info";
};

export type ToastContextType = {
  showToast: (toast: Omit<ToastType, "id">) => void;
};

export const ToastContext = createContext<{
  showToast: (toast: Omit<ToastType, "id">) => void;
}>({
  showToast: () => null,
});

export const useToast = () => {
  return useContext(ToastContext);
};
