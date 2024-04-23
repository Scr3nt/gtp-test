import { supabase } from "../lib/supabase";
import { Task, TasksListSortOptions } from "../types/Tasks.type";

export const getAllTasks = async (
  date: string,
  sort: TasksListSortOptions,
): Promise<Task[]> => {
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("date", date)
    .order(sort, { ascending: true })
    .order("start_hour", { ascending: true })
    .order("end_hour", { ascending: true });

  if (data) {
    return data as Task[];
  }
  return [];
};
