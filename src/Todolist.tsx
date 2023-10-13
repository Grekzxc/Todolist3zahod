import React, { ChangeEvent, useCallback } from "react";
import { FilterValuesType } from "./AppWithRedux";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { ActionsType, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks_reduser";
import { Task } from "./Task";

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

export const Todolist = React.memo((props: TodolistPropsType) => {

    const dispath = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskPropsType>>(state => state.tasks[props.id])

    // const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    //     dispath(changeTaskStatusAC(taskId, isDone, todolistId))
    // }
    const onAllClickHandler = useCallback(() =>
        props.changeFilter("All", props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() =>
        props.changeFilter("Active", props.id), [props.changeFilter, props.id])
    const onComplitedClickHandler = useCallback(() =>
        props.changeFilter("Complited", props.id), [props.changeFilter, props.id])

    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = useCallback((newTitle: string) =>
        props.changeTodolistTitle(newTitle, props.id)
        , [props.changeTodolistTitle, props.id])

    let tasksForTodolist = tasks
    if (props.filter === 'Complited') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
    }
    if (props.filter === 'Active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
    }

    const addTask = useCallback((title: string) => {
        dispath(addTaskAC(title, props.id))
    }, [dispath, props.id])

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
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    tasksForTodolist.map(t => {
                        return <Task task={t} todoId={props.id} />
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
})



