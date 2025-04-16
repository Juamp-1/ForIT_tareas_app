import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons'; // Importa el icono de "más"

const TaskForm = ({ setTasks: propSetTasks }) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const isEditing = !!id;

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
        <Container>
            <h2>{isEditing ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Ingrese el título"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Ingrese la descripción"
                        required
                        style={{ resize: 'none' }} // Deshabilita el redimensionamiento del textarea
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mr-2">
                    {isEditing ? 'Guardar Cambios' : (
                        <>
                            Agregar Tarea
                        </>
                    )}  
                </Button>
                <Button variant="secondary" onClick={() => navigate('/tasks')}>Cancelar</Button>
            </Form>
        </Container>
    );
};

export default TaskForm;

// Cambios realizados en este archivo:
// 1. Se ajustó la clase 'mr-1' a 'mr-2' en el componente de icono para aumentar el espaciado a la derecha del icono.
// 2. Se añadió el estilo en línea 'resize: none' al componente <Form.Control as="textarea"> para evitar que se pueda redimensionar.