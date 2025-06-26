import useLocalStorage from "use-local-storage";
import { TASK_KEY, TaskState, type Task } from "../models/task";
import { useEffect, useState } from "react";
import { delay } from "../helpers/utils";

export default function useTasks() {
  const [taskData] = useLocalStorage<Task[]>(TASK_KEY, []);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);

  async function fetchTasks() {
    if (isLoadingTasks) {
      await delay(2000);
      setIsLoadingTasks(false);
    }

    setTasks(taskData);
  }

  useEffect(() => {
    fetchTasks();
  }, [taskData]);

  return {
    tasks,
    tasksCount: tasks.filter((task) => task.state === TaskState.CREATED).length,
    concludedTasksCount: tasks.filter((task) => task.concluded).length,
    isLoadingTasks,
  };
}
