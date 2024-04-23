export type Task = {
  id: string;
  title: string;
  start_hour: string;
  end_hour: string;
};

export type TasksListSortOptions = "title" | "start_hour" | "end_hour";
