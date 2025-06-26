import { ButtonIcon } from "../components/button-icon";
import { Card } from "../components/card";
import { InputCheckbox } from "../components/input-checkbox";
import { Text } from "../components/text";
import TrashIcon from "../assets/icons/trash.svg?react";
import PencilIcon from "../assets/icons/pencil.svg?react";
import XIcon from "../assets/icons/x.svg?react";
import CheckIcon from "../assets/icons/check.svg?react";
import { useState } from "react";
import { InputText } from "../components/input-text";
import { TaskState, type Task } from "../models/task";
import { cx } from "class-variance-authority";
import useTask from "../hooks/use-task";
import { Skeleton } from "../components/skeleton";

interface TaskItemProps {
  task: Task;
  loading?: boolean;
}

export default function TaskItem({ task, loading }: TaskItemProps) {
  // const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(
    task?.state === TaskState.CREATING
  );
  const [taskTitle, setTaskTitle] = useState(task?.title || "");
  const {
    updateTask,
    updateTaskStatus,
    deleteTask,
    isDeletingTask,
    isUpdatingTask,
  } = useTask();

  function handleEditTask() {
    setIsEditing(true);
  }

  function handleExitEditTask() {
    if (task.state === TaskState.CREATING) {
      deleteTask(task.id);
    }
    setIsEditing(false);
  }

  function handleChangeTaskTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value);
  }

  async function handleSaveTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await updateTask(task.id, { title: taskTitle });
    setIsEditing(false);
  }

  function hanldeChangeTaskStatus(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;

    updateTaskStatus(task.id, checked);
  }

  async function handleDeleteTask() {
    await deleteTask(task.id);
  }

  return (
    <Card size="md">
      {!isEditing ? (
        <div className="flex items-center gap-4">
          <InputCheckbox
            checked={task?.concluded}
            onChange={hanldeChangeTaskStatus}
            loading={loading}
          />
          {!loading ? (
            <Text className={cx("flex-1", { "line-through": task?.concluded })}>
              {task?.title}
            </Text>
          ) : (
            <Skeleton className="flex-1 h-6" />
          )}
          <div className="flex gap-1">
            <ButtonIcon
              icon={TrashIcon}
              variant="tertiary"
              onClick={handleDeleteTask}
              loading={loading}
              handling={isDeletingTask}
            />
            <ButtonIcon
              icon={PencilIcon}
              variant="tertiary"
              onClick={handleEditTask}
              loading={loading}
            />
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSaveTask}
          className="flex items-center gap-4 bg-red-400"
        >
          <InputText
            className="flex-1"
            value={taskTitle}
            onChange={handleChangeTaskTitle}
            required
            autoFocus
          />
          <div className="flex gap-1">
            <ButtonIcon
              icon={XIcon}
              variant="secondary"
              type="button"
              onClick={handleExitEditTask}
            />
            <ButtonIcon
              type="submit"
              icon={CheckIcon}
              variant="primary"
              handling={isUpdatingTask}
            />
          </div>
        </form>
      )}
    </Card>
  );
}
