import { useEffect, useState } from "react";

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from API
        fetch('http://localhost:3000/api/tasks') //calls backend
        .then(response => response.json())
        .then(data => {
            setTasks(data); //save tasks on state
        });
    },
    []);

    return (
        <div>
            <h2>Tareas:</h2>
            <ul>
                {tasks.map(task => (
                    <li key = {task.id}>
                        <strong>{task.title}</strong> - {task.description}
                        <span>{task.complete ? '✅': '❌'}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
    }
    
export default TaskList;