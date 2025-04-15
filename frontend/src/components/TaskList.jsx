import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'forit_tasks'; // Clave para guardar en Local Storage

function TaskList({ setTasks: propSetTasks }) {
    const [tasks, setTasks] = useState(() => {
        // Cargar tareas desde Local Storage al inicializar el estado
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    useEffect(() => {
        // Guardar tareas en Local Storage cada vez que la lista de tareas cambia
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
        if (propSetTasks) {
            propSetTasks(tasks); // Actualizar el estado en el componente padre si existe la prop
        }
    }, [tasks, propSetTasks]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${import.meta.env?.VITE_API_BASE_URL}/tasks`);
                if (!response.ok) {
                    console.error("Error fetching tasks from API");
                    return; // No actualizamos el estado con datos fallidos de la API
                }
                const data = await response.json();
                // Al cargar desde la API, podríamos decidir si reemplazar los datos locales o combinarlos.
                // Por ahora, los reemplazamos.
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                // Si falla la API, las tareas del Local Storage seguirán disponibles.
            }
        };

        fetchTasks();
    }, []);

    const handleDeleteTask = (idToDelete) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== idToDelete));
    };

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
                        <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <Link to="/new-task">Crear Nueva Tarea</Link>
        </div>
    );
}

export default TaskList;

// Cambios realizados:
// 1. Se definió una constante LOCAL_STORAGE_KEY para la clave en Local Storage.
// 2. El estado 'tasks' se inicializa intentando leer desde Local Storage. Si no hay nada, 
// se inicializa con un array vacío.
// 3. Un useEffect se encarga de guardar la lista de tareas en Local Storage 
// cada vez que el estado 'tasks' cambia.
// 4. Se agregó la función 'handleDeleteTask' para actualizar el estado local al eliminar una tarea.
// 5. El botón "Eliminar" ahora utiliza 'handleDeleteTask' para actualizar el estado local.
// 6. Se modificó el useEffect de la API para no actualizar el estado si la petición falla 
// (manteniendo los datos locales).