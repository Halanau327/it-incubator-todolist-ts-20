import { EditableSpan } from "common/components"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import React from "react"
import { TodolistDomainType, todolistsThunks } from "../../../model/todolistsSlice"
import { useAppDispatch } from "../../../../../common/hooks"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const removeTodolist = () => {
    dispatch(todolistsThunks.removeTodolist(id))
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(todolistsThunks.changeTodolistTitle({ id, title }))
  }

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitle} />
      <IconButton onClick={removeTodolist} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  )
}
