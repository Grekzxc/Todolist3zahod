import { v1 } from 'uuid'
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistFilterActionType, ChangeTodolistTitleAC, ChangeTodolistTitleActionType, RemoveTodolistAC, todolistReduser } from './todolist_reduser'
import { FilterValuesType, TodolistType } from '../App'

test('correct todolist chould be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const endState = todolistReduser(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist chould be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const endState = todolistReduser(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('All')
})

test('correct todolist chould its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const action = ChangeTodolistTitleAC(newTodolistTitle, todolistId2,)

    const endState = todolistReduser(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changet', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'Complited'

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const action = ChangeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistReduser(startState, action)

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})

