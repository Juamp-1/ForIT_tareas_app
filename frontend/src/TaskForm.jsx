const handleSubmit = async (event) => { 
    event.preventDefault();
    newTask = {title, description};

    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTask),
        });
                
        const createdTask = await response.json();
        setTasks(prev => [...prev, createdTask]); //Agrega nueva tarea a la lista
    }   catch(error) {
        console.error('Error creando tarea:', error);
        
    }
};