import { userReduser } from './user_reduser'

test('user reduser should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Alex' }

    const endState = userReduser(startState, { type: 'INCREMENT_AGE' })

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reduser should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 0, name: 'Alex' }

    const endState = userReduser(startState, { type: 'INCREMENT_CHILDREN_COUNT' })

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(1)

})

test('user reduser should change name of user', () => {
    const startState = { age: 20, childrenCount: 0, name: 'Alex' }
    const newName = 'Dimych'
    const endState = userReduser(startState, { type: 'CHANGE_NAME', newName: newName })

    expect(endState.name).toBe(newName)

})