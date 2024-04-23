import { router } from "expo-router";

import { User } from "@supabase/supabase-js";

import { ToastContextType } from "../components/Toast";
import { supabase } from "../lib/supabase";
import { isMoreThan8HoursApart } from "../utils/formatHour";

export const createTask = async (
  title: string,
  startHour: string,
  endHour: string,
  date: string,
  user: User | null,
  toast: ToastContextType,
) => {
  if (!title || !startHour || !endHour) {
    toast.showToast({
      title: "Erreur",
      subtitle: "Les champs sont obligatoires",
      key: "create_task_field_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }
  if (isMoreThan8HoursApart(startHour, endHour)) {
    toast.showToast({
      title: "Erreur",
      subtitle: "Les heures ne doivent pas avoir plus de 8h d'écart",
      key: "create_task_hour_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }
  const { error } = await supabase.from("tasks").insert({
    title,
    start_hour: startHour,
    end_hour: endHour,
    date,
    admin_id: user?.id,
  });

  if (error) {
    toast.showToast({
      title: "Erreur",
      subtitle: error.message,
      key: "create_task_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }

  router.back();
};
