import { supabase } from "../lib/supabase";
import { Task } from "../types/Tasks.type";

export const getAllTasks = async (date: string): Promise<Task[]> => {
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("date", date)
    .order("start_hour", { ascending: true })
    .order("end_hour", { ascending: true });

  if (data) {
    return data as Task[];
  }
  return [];
};
