import { addTaskAc, changeTaskStatusAC, changeTaskTitleAC, removeTaskAc, removeTodolistAC, tasksReduser } from "./tasks_reduser";
import { TasksStateType } from "../App";
import { v1 } from "uuid";
import { addTodolistAC } from "./todolist_reduser";

test('', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: true },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'Redux', isDone: true },
        ],
        'todolistId2': [
            { id: '1', title: 'Milk', isDone: true },
            { id: '2', title: 'Bear', isDone: true },
            { id: '3', title: 'Book', isDone: true },

        ]
    }

    const action = removeTaskAc('2', 'todolistId2')
    const endState = tasksReduser(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: true },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'Redux', isDone: true },
        ],
        'todolistId2': [
            { id: '1', title: 'Milk', isDone: true },
            { id: '2', title: 'Bear', isDone: true },
            { id: '3', title: 'Book', isDone: true },
        ]
    }

    const action = addTaskAc('juse', 'todolistId2')
    const endState = tasksReduser(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juse')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changet', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'Redux', isDone: false },
        ],
        'todolistId2': [
            { id: '1', title: 'Milk', isDone: false },
            { id: '2', title: 'Bear', isDone: true },
            { id: '3', title: 'Book', isDone: false },
        ]
    }

    const action = changeTaskStatusAC('2', false, 'todolistId2')
    const endState = tasksReduser(startState, action)

    expect(endState['todolistId2'][1].isDone).toBeFalsy()
    expect(endState['todolistId1'][1].isDone).toBeTruthy()
})

test('title of specified task should be changet', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'Redux', isDone: false },
        ],
        'todolistId2': [
            { id: '1', title: 'Milk', isDone: false },
            { id: '2', title: 'Bear', isDone: true },
            { id: '3', title: 'Book', isDone: false },
        ]
    }

    const action = changeTaskTitleAC('2', 'Dota', 'todolistId2')
    const endState = tasksReduser(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Dota')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'Redux', isDone: false },
        ],
        'todolistId2': [
            { id: '1', title: 'Milk', isDone: false },
            { id: '2', title: 'Bear', isDone: true },
            { id: '3', title: 'Book', isDone: false },
        ]
    }

    const action = addTodolistAC('new todolist')
    const endState = tasksReduser(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('propertry with todolist should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'Redux', isDone: false },
        ],
        'todolistId2': [
            { id: '1', title: 'Milk', isDone: false },
            { id: '2', title: 'Bear', isDone: true },
            { id: '3', title: 'Book', isDone: false },
        ]
    }

    const action = removeTodolistAC('todolistId2')
    const endState = tasksReduser(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})