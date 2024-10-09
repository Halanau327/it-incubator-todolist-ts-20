import { Delete } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { AddItemForm, EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks"
import React, { useEffect } from "react"
import { tasksThunks } from "../../model/tasksSlice"
import { TodolistDomainType, todolistsThunks } from "../../model/todolistsSlice"
import { TaskType } from "../../api/tasksApi.types"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"

type PropsType = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}

export const Todolist = function (props: PropsType) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(props.todolist.id))
  }, [])

  const addTask = (title: string) => {
    dispatch(tasksThunks.addTask({ title, todolistId: props.todolist.id }))
  }

  const removeTodolist = () => {
    dispatch(todolistsThunks.removeTodolist(props.todolist.id))
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(todolistsThunks.changeTodolistTitle({ id: props.todolist.id, title }))
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"} />
      <div>
        <Tasks todolist={props.todolist} tasks={props.tasks} />
      </div>
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={props.todolist} />
      </div>
    </div>
  )
}
