import { TasksStateType, TodolistType } from "../App"
import { tasksReducer } from "./tasks_reduser"
import { addTodolistAC, todolistReducer } from "./todolist_reduser"

test('its should be equals', () => {
    const startTaskState: TasksStateType = {}
    const startTodolistState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')

    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistState = todolistReducer(startTodolistState, action)

    const keys = Object.keys(endTaskState)
    const idFormTask = keys[0]
    const idFormTodolist = endTodolistState[0].id

    expect(idFormTask).toBe(action.todolistId)
    expect(idFormTodolist).toBe(action.todolistId)
})