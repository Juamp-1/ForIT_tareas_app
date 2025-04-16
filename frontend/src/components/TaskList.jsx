import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { TrashFill, CheckCircleFill, XCircleFill, PencilSquare } from 'react-bootstrap-icons';

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
                    <ListGroup.Item key={task.id} className="d-flex align-items-center" style={{ position: 'relative' }}>
                        <div className="flex-grow-1 mr-3" style={{ overflowWrap: 'anywhere', marginRight: '170px' }}>
                            <Link to={`/tasks/${task.id}`}>
                                <strong>{task.title}</strong>
                            </Link> - {task.description}
                            <span className="ml-2" style={{ marginRight: '0.2rem' }}> {/* Reducir margen del icono de estado */}
                                {task.complete ? (
                                    <CheckCircleFill color="green" size={20} className="align-middle" />
                                ) : (
                                    <XCircleFill color="red" size={20} className="align-middle" />
                                )}
                            </span>
                        </div>
                        <div style={{ position: 'absolute', right: '10px', top: '5px', display: 'flex', alignItems: 'center' }}>
                            <Link to={`/tasks/${task.id}/edit`} className="btn btn-sm btn-primary mr-1 d-flex align-items-center"> {/* Reducir margen del icono de Editar */}
                                <PencilSquare size={20} style={{ marginRight: '0.2rem' }} /> <span className="ml-1">Editar</span>
                            </Link>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteTask(task.id)} className="d-flex align-items-center" style={{ marginLeft: '0.2rem' }}> {/* Reducir margen del icono de Eliminar */}
                                <TrashFill size={20} style={{ marginRight: '0.1rem' }} /> <span className="ml-1">Eliminar</span>
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
// 1. Se redujo el 'marginRight' del span que contiene los iconos de estado (Check/Cross) de '0.5rem' a '0.2rem'.
// 2. Se redujo el 'marginRight' del botón/link de "Editar" de 'mr-2' a 'mr-1'.
// 3. Se redujo el 'marginLeft' del botón de "Eliminar" de '0.5rem' a '0.2rem'.