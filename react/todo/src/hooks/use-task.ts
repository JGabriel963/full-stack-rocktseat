import useLocalStorage from "use-local-storage";
import { type Task, TASK_KEY, TaskState } from "../models/task";
import { delay } from "../helpers/utils";
import React from "react";

export default function useTask() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASK_KEY, []);
  const [isUpdatingTask, setIsUpdatingTask] = React.useState(false);
  const [isDeletingTask, setIsDeletingTask] = React.useState(false);

  function prepareTask() {
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(36).substring(2, 9),
        title: "",
        state: TaskState.CREATING,
      },
    ]);
  }

  async function updateTask(id: string, payload: { title: Task["title"] }) {
    setIsUpdatingTask(true);

    await delay(1000);

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              state: TaskState.CREATED,
              ...payload,
            }
          : task
      )
    );

    setIsUpdatingTask(false);
  }

  function updateTaskStatus(id: string, concluded: boolean) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              concluded,
            }
          : task
      )
    );
  }

  async function deleteTask(id: string) {
    setIsDeletingTask(true);
    await delay(1000);
    setTasks(tasks.filter((task) => task.id !== id));
    setIsDeletingTask(false);
  }

  return {
    prepareTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    isUpdatingTask,
    isDeletingTask,
  };
}
