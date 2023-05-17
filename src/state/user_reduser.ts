export type StateType = {
    age: number
    childrenCount: number
    name: string
}
export type ActionType = {
    type: 'INCREMENT_AGE' | 'INCREMENT_CHILDREN_COUNT' | 'CHANGE_NAME'
    [key: string]: any
}



export const userReduser = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT_AGE':
            let newState = { ...state }
            newState.age = state.age + 1
            return newState
        case 'INCREMENT_CHILDREN_COUNT':
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.newName
            }


        default:
            throw new Error('i dont know')
    }
}