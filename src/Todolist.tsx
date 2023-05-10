import React from "react";
import { FilterValuesType } from "./App";

export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div className='todolist'>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => (<li><input type="checkbox" checked={t.isDone} />
                    <span>{t.title}</span>
                    <button onClick={() => { props.removeTask(t.id) }}>x</button>
                </li>)
                )}

            </ul>
            <div>
                <button onClick={() => { props.changeFilter("All") }}>All</button>
                <button onClick={() => { props.changeFilter("Active") }}>Active</button>
                <button onClick={() => { props.changeFilter("Complited") }}>Completed</button>
            </div>
        </div>

    );
}