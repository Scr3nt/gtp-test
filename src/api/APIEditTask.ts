import { router } from "expo-router";

import { ToastContextType } from "../components/Toast";
import { supabase } from "../lib/supabase";
import { Task } from "../types/Tasks.type";
import { isMoreThan8HoursApart } from "../utils/formatHour";

export const getTaskById = async (id: string): Promise<Task | null> => {
  const { data } = await supabase.from("tasks").select("*").eq("id", id);

  if (data) {
    return data[0] as Task;
  }
  return null;
};

export const updateTask = async (
  id: string,
  title: string,
  startHour: string,
  endHour: string,
  toast: ToastContextType,
) => {
  if (!id) {
    toast.showToast({
      title: "Erreur",
      subtitle: "Une erreur non attendue s'est produite",
      key: "update_task_id_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }

  if (!title || !startHour || !endHour) {
    toast.showToast({
      title: "Erreur",
      subtitle: "Les champs sont obligatoires",
      key: "update_task_field_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }
  if (isMoreThan8HoursApart(startHour, endHour)) {
    toast.showToast({
      title: "Erreur",
      subtitle: "Les heures ne doivent pas avoir plus de 8h d'écart",
      key: "update_task_hour_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }
  const { error } = await supabase
    .from("tasks")
    .update({
      title,
      start_hour: startHour,
      end_hour: endHour,
    })
    .eq("id", id);

  if (error) {
    toast.showToast({
      title: "Erreur",
      subtitle: error.message,
      key: "update_task_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }

  router.back();
};

export const deleteTask = async (id: string, toast: ToastContextType) => {
  if (!id) {
    toast.showToast({
      title: "Erreur",
      subtitle: "Une erreur non attendue s'est produite",
      key: "delete_task_id_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    toast.showToast({
      title: "Erreur",
      subtitle: error.message,
      key: "delete_task_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }

  router.back();
};
