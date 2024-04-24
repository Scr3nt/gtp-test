import { router } from "expo-router";

import { ToastContextType } from "../components/Toast";
import { supabase, supabaseAdmin } from "../lib/supabase";
import { Employee } from "../types/Employee.type";

export const getAllEmployees = async (): Promise<Employee[]> => {
  const { data } = await supabase.from("employee").select("*");

  if (data) {
    return data as Employee[];
  }
  return [];
};

export const getAllEmployeesWithTasks = async (
  date: string,
): Promise<Employee[]> => {
  const { data } = await supabase
    .from("employee")
    .select("*, tasks!inner(id, date)")
    .eq("tasks.date", date);

  if (data) {
    return data as Employee[];
  }
  return [];
};

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  if (!id) {
    return null;
  }

  const { data } = await supabase.from("employee").select("*").eq("id", id);

  if (data) {
    return data[0] as Employee;
  }
  return null;
};

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

export const updateEmployee = async (
  id: string,
  name: string,
  toast: ToastContextType,
) => {
  if (!id) {
    toast.showToast({
      title: "Erreur",
      subtitle: "Une erreur non attendue s'est produite",
      key: "update_employee_id_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }

  if (!name) {
    toast.showToast({
      title: "Erreur",
      subtitle: "Les champs sont obligatoires",
      key: "update_employee_name_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }

  const { error } = await supabase
    .from("employee")
    .update({
      name: name,
    })
    .eq("id", id);

  if (error) {
    toast.showToast({
      title: "Erreur",
      subtitle: error.message,
      key: "update_employee_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }

  router.back();
};

export const deleteEmployee = async (id: string, toast: ToastContextType) => {
  if (!id) {
    toast.showToast({
      title: "Erreur",
      subtitle: "Une erreur non attendue s'est produite",
      key: "delete_employee_id_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }

  const { error: deleteAuthUserError } =
    await supabaseAdmin.auth.admin.deleteUser(id);

  if (deleteAuthUserError) {
    toast.showToast({
      title: "Erreur",
      subtitle: deleteAuthUserError.message,
      key: "update_employee_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }

  const { error: deleteDbUserError } = await supabase
    .from("employee")
    .delete()
    .eq("id", id);

  if (deleteDbUserError) {
    toast.showToast({
      title: "Erreur",
      subtitle: deleteDbUserError.message,
      key: "delete_employee_error",
      icon: { name: "alert-circle-outline", size: 24, color: "red11" },
    });
    return;
  }

  router.back();
};
