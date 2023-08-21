import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../AppWithRedux"


export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST',
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD_TODOLIST',
    title: string
    todolistId: string
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


export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<TodolistType> = [
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' },
]

export const todolistReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD_TODOLIST':
            return [...state, {
                id: action.todolistId,
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
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: "REMOVE_TODOLIST", todolistId }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: "ADD_TODOLIST", title, todolistId: v1() }
}
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return { type: "CHANGE_TODOLIST_TITLE", title, id }
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: "CHANGE_TODOLIST_FILTER", id, filter }
}

