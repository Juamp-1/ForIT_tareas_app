import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${import.meta.env?.VITE_API_BASE_URL}/tasks`);
                console.log("Response status:", response.status); // Agregado para debugging
                console.log("Response ok:", response.ok);       // Agregado para debugging
                if (!response.ok) {
                    console.error("Response not OK");          // Agregado para debugging
                    throw new Error('La conexión no conecta D:');
                }
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

// Cambio realizado: Se agregaron logs para depurar la respuesta de la API y 
// se agregó el operador de encadenamiento opcional (?.) al acceder a import.meta.env.