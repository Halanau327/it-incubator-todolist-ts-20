import React, { ChangeEvent, useCallback } from "react"
import { Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { EditableSpan } from "common/components"
import { TaskStatuses } from "common/enums"
import { TaskType } from "../../../api/tasksApi.types"
import { tasksThunks } from "../../../model/tasksSlice"
import { useAppDispatch } from "common/hooks"

type Props = {
  task: TaskType
  todolistId: string
}

// const removeTask = useCallback(function (taskId: string, todolistId: string) {
//   dispatch(tasksThunks.removeTask({ taskId, todolistId }))
// }, [])

export const Task = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(tasksThunks.removeTask({ taskId: task.id, todolistId: todolistId }))
  }

  // const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
  //   dispatch(tasksThunks.updateTask({ taskId, domainModel: { status }, todolistId }))
  // }, [])
  //
  // const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
  //   dispatch(tasksThunks.updateTask({ taskId, domainModel: { title }, todolistId }))
  // }, [])
  //

  const updateTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(
      tasksThunks.updateTask({
        taskId: props.task.id,
        domainModel: { status },
        todolistId: props.todolistId,
      }),
    )
  }

  const updateTaskTitleHandler = (title: string) => {
    dispatch(
      tasksThunks.updateTask({
        taskId: props.task.id,
        domainModel: { title: title },
        todolistId: props.todolistId,
      }),
    )
  }

  return (
    <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        color="primary"
        onChange={updateTaskStatusHandler}
      />

      <EditableSpan value={props.task.title} onChange={updateTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
}
