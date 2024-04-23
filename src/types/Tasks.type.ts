export type Task = {
  id: string;
  title: string;
  start_hour: string;
  end_hour: string;
  date: string;
  admin_id: string;
  employee_id: string;
  created_at: string;
};

export type TasksListSortOptions = "title" | "start_hour" | "end_hour";
