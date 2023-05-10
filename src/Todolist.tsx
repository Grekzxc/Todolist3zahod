import React, { ChangeEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChengeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13) {
            onClickAddTaskHandler()
        }
    }
    const onClickAddTaskHandler = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => props.changeFilter("All")
    const onActiveClickHandler = () => props.changeFilter("Active")
    const onComplitedClickHandler = () => props.changeFilter("Complited")

    return (
        <div className='todolist'>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChengeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => { props.removeTask(t.id) }
                        return <li key={t.id}><input type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onComplitedClickHandler}>Completed</button>
            </div>
        </div>

    );
}