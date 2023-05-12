import React, { ChangeEvent, useState } from "react";
import { FilterValuesType } from "./App";

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
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChengeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            onClickAddTaskHandler()
        }
    }
    const onClickAddTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }

    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }


    const onAllClickHandler = () => props.changeFilter("All", props.id)
    const onActiveClickHandler = () => props.changeFilter("Active", props.id)
    const onComplitedClickHandler = () => props.changeFilter("Complited", props.id)

    return (
        <div className='todolist'>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChengeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ''}
                />
                <button onClick={onClickAddTaskHandler}>+</button>
                {error && <div className="error_message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => { props.removeTask(t.id, props.id) }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return <li
                            className={t.isDone ? 'is_done' : ''}
                            key={t.id}
                        >
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeHandler}
                            />
                            <span>{t.title}</span>
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