import React, { useReducer, useState } from 'react';
import './App.css';
import { TaskPropsType, Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, addTodolistAC } from './state/todolist_reduser';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type FilterValuesType = 'All' | 'Complited' | 'Active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskPropsType>
}

function AppWithRedux() {

    const dispath = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispath(ChangeTodolistFilterAC(value, todolistId))
    }

    const removeTodolist = (todolistId: string) => {
        dispath(RemoveTodolistAC(todolistId))
    }

    const changeTodolistTitle = (newTitle: string, id: string) => {
        dispath(ChangeTodolistTitleAC(newTitle, id))
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispath(action)
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
                        todolists.map((tl) => {

                            return (
                                <Grid item>
                                    <Paper elevation={3}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            // tasks={tasksForTodolist}
                                            changeFilter={changeFilter}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle} />
                                        {/* tasks={[] */}
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
export default AppWithRedux;
