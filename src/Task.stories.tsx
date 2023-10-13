import { action } from '@storybook/addon-actions'
import { Task, TaskProps } from "./Task";
import { TaskPropsType } from "./Todolist";


export default {
    title: 'Task component',
    component: Task,
}

const callback = action('Button ')

export const TaskBaseExample = (props: TaskProps) => {

    const todoId = "todo1";

    return (
        <Task task={{ id: "1", title: "Example Task", isDone: false }}
            todoId={todoId} />
    )
}

