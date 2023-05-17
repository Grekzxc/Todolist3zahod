import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../App"


export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD_TODOLIST',
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER',
    id: string
    filter: FilterValuesType
}
export type ActionType =
    RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType


export const todolistReduser = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD_TODOLIST':
            return [...state, {
                id: v1(),
                filter: 'All',
                title: action.title
            }]
        case 'CHANGE_TODOLIST_TITLE':
            const todolistTitle = state.find(tl => tl.id === action.id)
            if (todolistTitle) {
                todolistTitle.title = action.title
            }
            return [...state]

        case 'CHANGE_TODOLIST_FILTER':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        default:
            throw new Error('i dont know')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: "REMOVE_TODOLIST", id: todolistId }
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: "ADD_TODOLIST", title: title }
}
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return { type: "CHANGE_TODOLIST_TITLE", title: title, id: id }
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: "CHANGE_TODOLIST_FILTER", id: id, filter: filter }
}