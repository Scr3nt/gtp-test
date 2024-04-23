import { router } from "expo-router";

import { ToastContextType } from "../components/Toast";
import { supabase, supabaseAdmin } from "../lib/supabase";
import { Employee } from "../types/Employee.type";

export const createEmployee = async (
  email: string,
  password: string,
  name: string,
  admin_id: string,
  toast: ToastContextType,
) => {
  if (!admin_id) {
    toast.showToast({
      title: "Erreur",
      subtitle: "Une erreur non attendue s'est produite",
      key: "create_employee_admin_id_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }
  if (!name || !email || !password) {
    toast.showToast({
      title: "Erreur",
      subtitle: "Tous les champs sont obligatoires",
      key: "create_employee_field_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }
  const { error } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    user_metadata: { name: name, admin_id: admin_id },
    email_confirm: true,
  });

  if (error) {
    toast.showToast({
      title: "Erreur",
      subtitle: error.message,
      key: "create_employee_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }

  router.back();
};

export const getAllEmployees = async (): Promise<Employee[]> => {
  const { data } = await supabase.from("employee").select("*");

  if (data) {
    return data as Employee[];
  }
  return [];
};
