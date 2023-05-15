import { ChangeEvent, useState } from "react"

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChengeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            onClickAddTaskHandler()
        }
    }
    const onClickAddTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <input
                value={newTaskTitle}
                onChange={onNewTitleChengeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ''}
            />
            <button onClick={onClickAddTaskHandler}>+</button>
            {error && <div className="error_message">{error}</div>}
        </div>
    )
}