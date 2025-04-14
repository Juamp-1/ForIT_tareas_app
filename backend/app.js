//Constantes que almacenan datos necesarios para la ejecución del programa
const express = require('express')
const cors = require('cors');

//Configuración de la aplicación llamando a express mediante una constante llamada app
const app = express()
//Configuracion del puerto de entrada del servidor
const PORT = process.env.PORT || 3000;

//Variable que contiene el array de tareas
let = tasks = []

//Use
app.use(express.json());
app.use(cors());

//Peticiones del servidor o endpoints:

//Get- Obtener tareas
app.get('/api/tasks', (req, res) => {
    res.json(tasks); 
});  
app.get('/',(req, res) => {
    res.send('Hello Backend!')
})
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
  });
//Post- Agregar tarea
app.post('/api/tasks', (req, res) => {
    const {title, description} = req.body;

    if (
        !title || !description) { 
            return res.status(400).json({error: 'Title and description are required.'});
        }

        const newTask = {
            id: String(Date.now()),
            title,
            description,
            complete: false,
            createdAt: new Date()
        };
        tasks.push(newTask);
        res.status(201).json(newTask);
        });
//Put- Actualizar tarea
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, complete } = req.body;
  
    const task = tasks.find(task => task.id === id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
  
// Actualizar los campos solo si vienen en el body
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (complete !== undefined) task.complete = complete;
  
    res.json(task);
  });

//Delete - Eliminar tarea
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id === id);
  
    if (index === -1) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
  
    tasks.splice(index, 1); // Borra la tarea
    res.status(204).send(); // 204: sin contenido, OK
  });
  


//Inicializa el servidor
app.listen (PORT, () => {
    console.log("Server runing on port http://localhost:" + PORT);
});