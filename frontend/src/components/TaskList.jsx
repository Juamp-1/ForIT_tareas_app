import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/tasks');
                if (!response.ok) throw new Error('La conexión no conexiona D:');
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Tareas:</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <Link to={`/tasks/${task.id}`}>
                            <strong>{task.title}</strong>
                        </Link> - {task.description}
                        <span>{task.complete ? '✅' : '❌'}</span>
                        <Link to={`/tasks/${task.id}/edit`}>Editar</Link>
                    </li>
                ))}
            </ul>
            <Link to="/new-task">Crear Nueva Tarea</Link>
        </div>
    );
}

export default TaskList;