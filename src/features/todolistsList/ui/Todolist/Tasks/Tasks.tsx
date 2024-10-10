import { Task } from "../Task/Task"
import React from "react"
import { TodolistDomainType } from "../../../model/todolistsSlice"
import { TaskType } from "../../../api/tasksApi.types"
import { useSelector } from "react-redux"
import { selectFilteredTasks } from "../../../model/tasksSlice"
import { AppRootStateType } from "../../../../../app/store"

type Props = {
  todolist: TodolistDomainType
}

export const Tasks = ({ todolist }: Props) => {
  const tasksForTodolist = useSelector<AppRootStateType, TaskType[]>((state) =>
    selectFilteredTasks(state, todolist.id, todolist.filter),
  )

  return (
    <>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
    </>
  )
}
