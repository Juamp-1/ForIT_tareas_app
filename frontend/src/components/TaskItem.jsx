import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskItem = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [isEditingInternal, setIsEditingInternal] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname.includes(`/tasks/${id}/edit`)) {
            setIsEditingInternal(true);
        } else {
            setIsEditingInternal(false);
        }
    }, [window.location.pathname, id]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`);
                if (!response.ok) throw new Error('Error al obtener la tarea');
                const data = await response.json();
                setTask(data);
                setEditTitle(data.title);
                setEditDescription(data.description);
            } catch (error) {
                console.error('Error al obtener la tarea:', error);
                setTask(null);
            }
        };

        if (id) {
            fetchTask();
        }
    }, [id]);

    if (!task) {
        return <div>Cargando detalles de la tarea...</div>;
    }

    const handleDelete = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`, { method: 'DELETE' });
            navigate('/tasks');
        } catch (error) {
            console.error('Error eliminando tarea', error);
        }
    };

    const handleCompleteChange = async (event) => {
        try {
            const updatedTask = { ...task, complete: event.target.checked };
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ complete: event.target.checked }),
            });

            if (response.ok) {
                setTask(updatedTask);
            } else {
                console.error('Error al actualizar la tarea');
            }
        } catch (error) {
            console.error('Error al actualizar la tarea', error);
        }
    };

    const handleSaveClick = async () => {
        try {
            const updatedTask = { ...task, title: editTitle, description: editDescription };
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: editTitle, description: editDescription }),
            });

            if (response.ok) {
                setTask(updatedTask);
                setIsEditingInternal(false);
            } else {
                console.error('Error al actualizar la tarea');
            }
        } catch (error) {
            console.error('Error al actualizar la tarea', error);
        }
    };

    const handleCancelClick = () => {
        setIsEditingInternal(false);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const handleEditClick = () => {
        navigate(`/tasks/${id}/edit`);
    };

    return (
        <div>
            {isEditingInternal ? (
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
                    <div>
                        <label>
                            Completada:
                            <input
                                type="checkbox"
                                font-size="10px"
                                checked={task?.complete}
                                onChange={handleCompleteChange}
                            />
                        </label>
                    </div>
                    <button onClick={handleSaveClick}>Guardar</button>
                    <button onClick={handleCancelClick}>Cancelar</button>
                </div>
            ) : (
                <div>
                    <h2>Detalles de la Tarea</h2>
                    <h3>{task?.title}</h3>
                    <p>{task?.description}</p>
                    <div>
                        <label>
                            Completada:
                            <input
                                type="checkbox"
                                checked={task?.complete}
                                onChange={handleCompleteChange}
                                readOnly // Make it read-only on the details page
                                style={{ marginBottom:"1rem" ,marginLeft: "0.5rem"}}
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