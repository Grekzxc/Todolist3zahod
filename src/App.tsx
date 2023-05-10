import React, { useState } from 'react';
import './App.css';
import { TaskPropsType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'All' | 'Complited' | 'Active'

function App() {

    let [tasks, setTasks] = useState<Array<TaskPropsType>>([
        { id: v1(), title: 'CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'Redux', isDone: true },
        { id: v1(), title: 'React', isDone: false },
    ])
    let [filter, setFilter] = useState<FilterValuesType>('All')

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    const addTask = (title: string) => {
        let newTask = { id: v1(), title: title, isDone: false }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let tasksForTodolist = tasks
    if (filter === 'Complited') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}
export default App;
