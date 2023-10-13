import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks_reduser";
import { todolistReducer } from "./todolist_reduser";

const rootRedicer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

// type AppRootState = {
//     todolist: Array<TodolistType>
//     tasks: TasksStateType
// }
export type AppRootState = ReturnType<typeof rootRedicer>

export const store = createStore(rootRedicer)

// @ts-ignore
window.store = store


