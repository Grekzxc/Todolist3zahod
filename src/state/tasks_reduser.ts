import { v1 } from "uuid"
import { TasksStateType, } from "../AppWithRedux"
import { AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2 } from "./todolist_reduser"

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    todolistId: string
    taskId: string,
}
export type AddTaskActionType = {
    type: 'ADD_TASK',
    title: string
    todolistId: string
}
export type ChangeTaskActionType = {
    type: 'CHANGE_TASK_STATUS',
    isDone: boolean
    todolistId: string
    taskId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE',
    title: string
    todolistId: string
    taskId: string
}
export type ActionsType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskActionType |
    ChangeTaskTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType

const initialState: TasksStateType = {
    // [todolistId1]: [
    //     { id: v1(), title: 'CSS', isDone: true },
    //     { id: v1(), title: 'JS', isDone: true },
    //     { id: v1(), title: 'Redux', isDone: true },
    //     { id: v1(), title: 'React', isDone: false },
    // ],
    // [todolistId2]: [
    //     { id: v1(), title: 'Book', isDone: true },
    //     { id: v1(), title: 'Milk', isDone: true },
    //     { id: v1(), title: 'Bear', isDone: true },
    //     { id: v1(), title: 'Bread', isDone: false },
    // ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            const stateCopy = { ...state }
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD_TASK': {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todolistId]
            const newTask = { id: v1(), title: action.title, isDone: false }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE_TASK_STATUS': {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? { ...t, isDone: action.isDone } : t)
            return stateCopy
        }
        case 'CHANGE_TASK_TITLE': {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todolistId]
            const taskStatus = tasks.find(t => t.id === action.taskId)
            if (taskStatus) {
                taskStatus.title = action.title
            }
            return stateCopy
        }
        case "ADD_TODOLIST": {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE_TODOLIST": {
            const stateCopy = { ...state }
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): ActionsType => {
    return { type: "REMOVE_TASK", todolistId, taskId, }
}
export const addTaskAC = (title: string, todolistId: string): ActionsType => {
    return { type: "ADD_TASK", title, todolistId }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ActionsType => {
    return { type: "CHANGE_TASK_STATUS", todolistId, taskId, isDone }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ActionsType => {
    return { type: "CHANGE_TASK_TITLE", todolistId, taskId, title }
}
export const removeTodolistAC = (todolistId: string): ActionsType => {
    return { type: "REMOVE_TODOLIST", todolistId }
}

