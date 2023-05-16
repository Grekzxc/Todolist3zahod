import { Button, Fab, Icon, IconButton, SvgIcon, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import { ControlPoint, ControlPointTwoTone } from "@mui/icons-material";

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
            <TextField
                label={'Type value'}
                variant="standard"
                size="small"
                value={newTaskTitle}
                onChange={onNewTitleChengeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                onClick={onClickAddTaskHandler}
                color="inherit"
                size="small">

                <ControlPointTwoTone />
            </IconButton>
        </div>
    )
}