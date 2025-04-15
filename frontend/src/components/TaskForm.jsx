import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = ({ setTasks: propSetTasks }) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const isEditing = !!id; // Check if 'id' exists, indicating editing

    useEffect(() => {
        if (isEditing) {
            const fetchTask = async () => {
                try {
                    const response = await fetch(`${import.meta.env?.VITE_API_BASE_URL}/tasks/${id}`);
                    if (!response.ok) throw new Error('Error fetching task for edit');
                    const data = await response.json();
                    setTitle(data.title);
                    setDescription(data.description);
                } catch (error) {
                    console.error('Error fetching task for edit:', error);
                }
            };
            fetchTask();
        } else {
            setTitle('');
            setDescription('');
        }
    }, [id, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, description };
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing
            ? `${import.meta.env?.VITE_API_BASE_URL}/tasks/${id}`
            : `${import.meta.env?.VITE_API_BASE_URL}/tasks`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                const result = await response.json();
                if (propSetTasks) {
                    if (isEditing) {
                        propSetTasks(prev => prev.map(t => (t.id === result.id ? result : t)));
                    } else {
                        propSetTasks(prev => [...prev, result]);
                    }
                }
                navigate('/tasks');
            } else {
                console.error(`Error ${isEditing ? 'updating' : 'creating'} task:`, response);
            }
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} task:`, error);
        }
    };

    return (
        <div>
            <h2>{isEditing ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Título"
                    required
                />
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Descripción"
                    required
                />
                <button type="submit">{isEditing ? 'Guardar Cambios' : 'Agregar Tarea'}</button>
                <button type="button" onClick={() => navigate('/tasks')}>Cancelar</button>
            </form>
        </div>
    );
};

export default TaskForm;

// Cambio realizado: Se agregó el operador de encadenamiento opcional (?.) al acceder a import.meta.env.