import React, { useState } from 'react';

const TaskForm = ({ setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    const newTask = { title, description }; // Crea un objeto de tarea

    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask), // Convierte el objeto a JSON
      });
      const createdTask = await response.json(); // Obtiene la tarea creada
      setTasks(prev => [...prev, createdTask]); // Actualiza el estado
      setTitle(''); // Limpia el campo de título
      setDescription(''); // Limpia el campo de descripción
    } catch (error) {
      console.error('Error creating task:', error); // Maneja el error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" required />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default TaskForm;