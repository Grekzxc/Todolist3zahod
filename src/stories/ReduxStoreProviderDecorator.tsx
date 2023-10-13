import React from "react"
import { Provider } from "react-redux"
import { AppRootState, store } from "../state/store"
import { combineReducers, createStore } from "redux"
import { todolistId1, todolistId2, todolistReducer } from "../state/todolist_reduser"
import { tasksReducer } from "../state/tasks_reduser"
import { v1 } from "uuid"

const rootRedicer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

const InitialGlobalState = {
    todolists: [
        { id: 'todolistId1', title: 'What to learn', filter: 'All' },
        { id: 'todolistId2', title: 'What to buy', filter: 'All' },
    ],
    tasks: {
        ['todolistId1']: [
            { id: v1(), title: 'CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'Redux', isDone: true },
            { id: v1(), title: 'React', isDone: false },
        ],
        ['todolistId2']: [
            { id: v1(), title: 'Book', isDone: true },
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Bear', isDone: true },
            { id: v1(), title: 'Bread', isDone: false },
        ]
    }
}

export const storyBookStore = createStore(rootRedicer, InitialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFN: any) => {
    return <Provider store={storyBookStore}> {storyFN()}</Provider>
}