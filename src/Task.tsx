import { useDispatch } from "react-redux"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks_reduser"
import { TaskPropsType } from "./Todolist"
import { ChangeEvent } from "react"
import { Checkbox, IconButton } from "@mui/material"
import { EditableSpan } from "./EditableSpan"
import { Delete } from "@mui/icons-material"


export type TaskProps = {
    task: TaskPropsType
    todoId: string
}

export const Task = ({ task, todoId }: TaskProps) => {
    const dispath = useDispatch()

    const onRemoveHandler = () => dispath(removeTaskAC(task.id, todoId))
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let neIsDoneValue = e.currentTarget.checked
        dispath(changeTaskStatusAC(task.id, neIsDoneValue, todoId))
    }
    const onChangeTitleHandler = (newValue: string) => {
        dispath(changeTaskTitleAC(task.id, newValue, todoId))
    }
    return <div
        key={task.id}
        className={task.isDone ? 'is_done' : ''}
    >
        <Checkbox
            checked={task.isDone}
            onChange={onChangeStatusHandler}
        />
        <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
        <IconButton onClick={onRemoveHandler}>
            <Delete />
        </IconButton>
    </div>
}