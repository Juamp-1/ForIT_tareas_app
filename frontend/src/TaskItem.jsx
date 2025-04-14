const handleUpdate = async () => {
    //Codigo para actualizar la tarea
};

const handleDelete = async () => {
    try {
        await fetch(`http://localhost:${PORT}/api/tasks/${task.id}`, { method: 'DELETE'});
        setTasks(prev => prev.filter(t => t.id !== task.id));
    }   catch (error) {
        console.error('Error eliminando tarea', error);
    }
};