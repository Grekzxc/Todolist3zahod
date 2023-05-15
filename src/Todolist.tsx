import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskPropsType>
    filter: FilterValuesType
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, id: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const onAllClickHandler = () => props.changeFilter("All", props.id)
    const onActiveClickHandler = () => props.changeFilter("Active", props.id)
    const onComplitedClickHandler = () => props.changeFilter("Complited", props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }

    return (
        <div className='todolist'>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => { props.removeTask(t.id, props.id) }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return <li
                            key={t.id}
                            className={t.isDone ? 'is_done' : ''}
                        >
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeStatusHandler}
                            />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button
                    onClick={onAllClickHandler}
                    className={props.filter === "All" ? "active_filter" : ''}
                >All
                </button>
                <button
                    onClick={onActiveClickHandler}
                    className={props.filter === "Active" ? "active_filter" : ''}
                >Active
                </button>
                <button
                    onClick={onComplitedClickHandler}
                    className={props.filter === "Complited" ? "active_filter" : ''}
                >Complited
                </button>
            </div>
        </div>
    );
}





