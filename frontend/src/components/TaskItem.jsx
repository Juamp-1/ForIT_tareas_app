import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskItem = ({ setTasks: propSetTasks }) => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/tasks/${id}`);
                if (!response.ok) throw new Error('Error fetching task');
                const data = await response.json();
                setTask(data);
                setEditTitle(data.title);
                setEditDescription(data.description);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };

        fetchTask();
    }, [id]);

    if (!task) {
        return <div>Cargando detalles de la tarea...</div>;
    }

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:3000/api/tasks/${id}`, { method: 'DELETE' });
            propSetTasks(prev => prev.filter(t => t.id !== id));
            navigate('/tasks');
        } catch (error) {
            console.error('Error eliminando tarea', error);
        }
    };

    const handleCompleteChange = async (event) => {
        try {
            const updatedTask = { ...task, complete: event.target.checked };
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ complete: event.target.checked }),
            });

            if (response.ok) {
                setTask(updatedTask);
                // If setTasks was passed as a prop, update the list as well
                if (propSetTasks) {
                    propSetTasks(prev =>
                        prev.map(t => (t.id === id ? updatedTask : t))
                    );
                }
            } else {
                console.error('Error al actualizar la tarea');
            }
        } catch (error) {
            console.error('Error al actualizar la tarea', error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const updatedTask = { ...task, title: editTitle, description: editDescription };
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: editTitle, description: editDescription }),
            });

            if (response.ok) {
                setTask(updatedTask);
                setIsEditing(false);
                if (propSetTasks) {
                    propSetTasks(prev =>
                        prev.map(t => (t.id === id ? updatedTask : t))
                    );
                }
            } else {
                console.error('Error al actualizar la tarea');
            }
        } catch (error) {
            console.error('Error al actualizar la tarea', error);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    if (window.location.pathname.includes('/edit')) {
        setIsEditing(true);
    }

    return (
        <div>
            {isEditing ? (
                <div>
                    <h2>Editar Tarea</h2>
                    <input
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        placeholder="Título"
                        required
                    />
                    <textarea
                        value={editDescription}
                        onChange={e => setEditDescription(e.target.value)}
                        placeholder="Descripción"
                        required
                    />
                    <button onClick={handleSaveClick}>Guardar</button>
                    <button onClick={handleCancelClick}>Cancelar</button>
                </div>
            ) : (
                <div>
                    <h2>Detalles de la Tarea</h2>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <div>
                        <label>
                            Completada:
                            <input
                                type="checkbox"
                                checked={task.complete}
                                onChange={handleCompleteChange}
                                readOnly // Make it read-only on the details page
                            />
                        </label>
                    </div>
                    <button onClick={handleEditClick}>Editar</button>
                    <button onClick={handleDelete}>Eliminar</button>
                    <button onClick={() => navigate('/tasks')}>Volver a la lista</button>
                </div>
            )}
        </div>
    );
};

export default TaskItem;