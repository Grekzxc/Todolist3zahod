import React, { useState } from 'react';
import './App.css';
import { TaskPropsType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

export type FilterValuesType = 'All' | 'Complited' | 'Active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskPropsType>

}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        let task = tasks[todolistId]
        let filteredTasks = task.filter(t => t.id !== id)
        tasks[todolistId] = filteredTasks
        setTasks({ ...tasks })
    }
    const addTask = (title: string, todolistId: string) => {
        let newTask = { id: v1(), title: title, isDone: false }
        let task = tasks[todolistId]
        let newTasks = [newTask, ...task]
        tasks[todolistId] = newTasks
        setTasks({ ...tasks })
    }
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let task = tasks[todolistId]
        let task1 = task.find(t => t.id === taskId)
        if (task1) {
            task1.isDone = isDone
            setTasks({ ...tasks })
        }
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let task = tasks[todolistId]
        let task1 = task.find(t => t.id === taskId)
        if (task1) {
            task1.title = newTitle
            setTasks({ ...tasks })
        }
    }


    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todoList = todolist.find(tl => tl.id === todolistId);
        if (todoList) {
            todoList.filter = value
            setTodolist([...todolist])
        }
        // setTodolist(todolist.map(tl => tl.id === todolistId ? { ...tl, value: value } : tl))
    }
    const removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolist.filter(tl => tl.id !== todolistId)
        setTodolist(filteredTodolist)
        delete tasks[todolistId]
        setTasks({ ...tasks })
    }
    const addTodolist = (title: string) => {
        let todolists: TodolistType = {
            id: v1(),
            filter: 'All',
            title: title
        }
        setTodolist([todolists, ...todolist])
        setTasks({
            ...tasks,
            [todolists.id]: []
        })
    }

    const changeTodolistTitle = (newTitle: string, id: string) => {
        const todolistTitle = todolist.find(tl => tl.id === id)
        if (todolistTitle) {
            todolistTitle.title = newTitle
            setTodolist([...todolist])
        }
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
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
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
export default App;
