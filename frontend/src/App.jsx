import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';

function App() {
    const [tasks, setTasks] = useState([]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/tasks" element={<TaskList setTasks={setTasks} />} />
                <Route path="/new-task" element={<TaskForm setTasks={setTasks} />} />
                <Route path="/tasks/:id" element={<TaskItem />} />
                <Route path="/tasks/:id/edit" element={<TaskForm setTasks={setTasks} />} />
                <Route path="/" element={<Navigate to="/tasks" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

// Cambio realizado: Se importó el componente 'Navigate' desde 'react-router-dom'.