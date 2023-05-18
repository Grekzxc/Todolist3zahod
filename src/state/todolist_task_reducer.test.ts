import { TasksStateType, TodolistType } from "../App"
import { tasksReduser } from "./tasks_reduser"
import { addTodolistAC, todolistReduser } from "./todolist_reduser"

test('its should be equals', () => {
    const startTaskState: TasksStateType = {}
    const startTodolistState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')

    const endTaskState = tasksReduser(startTaskState, action)
    const endTodolistState = todolistReduser(startTodolistState, action)

    const keys = Object.keys(endTaskState)
    const idFormTask = keys[0]
    const idFormTodolist = endTodolistState[0].id

    expect(idFormTask).toBe(action.todolistId)
    expect(idFormTodolist).toBe(action.todolistId)
})