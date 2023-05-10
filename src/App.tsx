import React, { useState } from 'react';
import './App.css';
import { TaskPropsType, Todolist } from './Todolist';

export type FilterValuesType = 'All' | 'Complited' | 'Active'

function App() {

    let [tasks, setTasks] = useState<Array<TaskPropsType>>([
        { id: 1, title: 'CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'React', isDone: false },
        { id: 4, title: 'Redux', isDone: true },
    ])
    let [filter, setFilter] = useState<FilterValuesType>('All')

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
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
            />

        </div>

    );
}

export default App;
