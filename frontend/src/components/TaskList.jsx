import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { TrashFill, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons'; // Importa los iconos de Bootstrap Icons

const LOCAL_STORAGE_KEY = 'forit_tasks';

function TaskList({ setTasks: propSetTasks }) {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
        if (propSetTasks) {
            propSetTasks(tasks);
        }
    }, [tasks, propSetTasks]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${import.meta.env?.VITE_API_BASE_URL}/tasks`);
                if (!response.ok) {
                    console.error("Error fetching tasks from API");
                    return;
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleDeleteTask = (idToDelete) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== idToDelete));
    };

    return (
        <Container>
            <h2>Tareas:</h2>
            <ListGroup>
                {tasks.map(task => (
                    <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
                        <div>
                            <Link to={`/tasks/${task.id}`}>
                                <strong>{task.title}</strong>
                            </Link> - {task.description}
                            <span className="ml-2">
                                {task.complete ? (
                                    <CheckCircleFill color="green" size={16} className="align-middle mr-2" />
                                ) : (
                                    <XCircleFill color="red" size={16} className="align-middle mr-2" />
                                )}
                            </span>
                        </div>
                        <div>
                            <Link to={`/tasks/${task.id}/edit`} className="btn btn-sm btn-primary mr-2">Editar</Link>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteTask(task.id)}>
                                <TrashFill size={16} className="align-middle mr-2" /> Eliminar
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Link to="/new-task" className="btn btn-success mt-3">Crear Nueva Tarea</Link>
        </Container>
    );
}

export default TaskList;

// Cambios realizados en este archivo:
// 1. Se ajustó la clase 'mr-1' a 'mr-2' en los componentes de icono para aumentar el espaciado a la derecha del icono.