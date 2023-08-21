import React, { useReducer, useState } from 'react';
import './App.css';
import { TaskPropsType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks_reduser';
import { ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, addTodolistAC, todolistId1, todolistId2, todolistReducer } from './state/todolist_reduser';

export type FilterValuesType = 'All' | 'Complited' | 'Active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskPropsType>

}

function AppWithReducers() {


    let [todolist, dispatchTodolistReducer] = useReducer(todolistReducer, [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            { id: v1(), title: 'CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'Redux', isDone: true },
            { id: v1(), title: 'React', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Book', isDone: true },
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Bear', isDone: true },
            { id: v1(), title: 'Bread', isDone: false },
        ]
    })

    const removeTask = (id: string, todolistId: string) => {
        dispatchToTasksReducer(removeTaskAC(id, todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatchToTasksReducer(addTaskAC(title, todolistId))
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatchTodolistReducer(ChangeTodolistFilterAC(todolistId, value))
    }

    const removeTodolist = (todolistId: string) => {
        dispatchTodolistReducer(RemoveTodolistAC(todolistId))
        dispatchToTasksReducer(RemoveTodolistAC(todolistId))
    }

    const changeTodolistTitle = (newTitle: string, id: string) => {
        dispatchTodolistReducer(ChangeTodolistTitleAC(newTitle, id))
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodolistReducer(action)
        dispatchToTasksReducer(action)
    }


    return (
        <div className="App">
            <Container fixed>
                <AppBar>
                    <Toolbar>
                        <IconButton edge='start' color='inherit' aria-label='menu' >
                            <Menu />
                        </IconButton>
                        <Typography variant='h6'>
                            News
                        </Typography>
                        <Button color='inherit'>Login</Button>
                    </Toolbar>
                </AppBar>

                <Grid container padding={10}>
                    <Paper elevation={3}>
                        <AddItemForm addItem={addTodolist} />
                    </Paper >
                </Grid>
                <Grid container spacing={5}>
                    {

                        todolist.map((tl) => {
                            let tasksForTodolist = tasks[tl.id]
                            if (tl.filter === 'Complited') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                            }
                            if (tl.filter === 'Active') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                            }
                            return (
                                <Grid item>
                                    <Paper elevation={3}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            // removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            // addTask={addTask}
                                            // changeStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            // changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
export default AppWithReducers;
