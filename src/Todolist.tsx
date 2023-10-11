import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./AppWithRedux";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks_reduser";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    id: string
    title: string
    // tasks: Array<TaskPropsType>
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, id: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const dispath = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskPropsType>>(state => state.tasks[props.id])

    // const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    //     dispath(changeTaskStatusAC(taskId, isDone, todolistId))
    // }

    const onAllClickHandler = () => props.changeFilter("All", props.id)
    const onActiveClickHandler = () => props.changeFilter("Active", props.id)
    const onComplitedClickHandler = () => props.changeFilter("Complited", props.id)

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }

    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks

    if (props.filter === 'Complited') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
    }
    if (props.filter === 'Active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
    }

    return (
        <div className='todolist'>
            <h3>
                <EditableSpan
                    title={props.title}
                    onChange={changeTodolistTitle} />
                <IconButton
                    onClick={removeTodolist}
                    size="small">
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={(title) => {
                dispath(addTaskAC(title, props.id))
            }} />
            <ul>
                {
                    tasksForTodolist.map(t => {
                        const onRemoveHandler = () => dispath(removeTaskAC(t.id, props.id))
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let neIsDoneValue = e.currentTarget.checked
                            dispath(changeTaskStatusAC(t.id, neIsDoneValue, props.id))
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            dispath(changeTaskTitleAC(t.id, newValue, props.id))
                        }
                        return <div
                            key={t.id}
                            className={t.isDone ? 'is_done' : ''}
                        >
                            <Checkbox

                                checked={t.isDone}
                                onChange={onChangeStatusHandler}
                            />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                            <IconButton onClick={onRemoveHandler}>
                                <Delete />
                            </IconButton>
                        </div>
                    })
                }

            </ul>
            <div>
                <Button
                    size="small"
                    color="inherit"
                    onClick={onAllClickHandler}
                    className={props.filter === "All" ? "active_filter" : ''}
                >All
                </Button>
                <Button
                    size="small"
                    color="inherit"
                    onClick={onActiveClickHandler}
                    className={props.filter === "Active" ? "active_filter" : ''}
                >Active
                </Button>
                <Button
                    size="small"
                    color="inherit"
                    onClick={onComplitedClickHandler}
                    className={props.filter === "Complited" ? "active_filter" : ''}
                >Complited
                </Button>
            </div>
        </div>
    );
}





