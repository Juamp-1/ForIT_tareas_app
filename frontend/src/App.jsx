import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/:id" element={<TaskItem />} />
        <Route path="/new-task" element={<TaskForm />} />
        <Route path="/tasks/:id/edit" element={<TaskForm />} />
        {/* Puedes añadir una ruta por defecto si lo deseas */}
        <Route path="/" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;