// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Constantes que almacenan datos necesarios para la ejecución del programa
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Aunque no lo estás usando actualmente, lo incluyo por si lo necesitas en el futuro

// Configuración de la aplicación llamando a express mediante una constante llamada app
const app = express();
// Configuracion del puerto de entrada del servidor
const PORT = process.env.PORT || 3000;

// Variable que contiene el array de tareas, cerrada con un semicolon para evitar errores, por mas que js
// tenga la "ASI" (Automatic Semicolon Insertion), ya que con ciertos caracteres, se puede considerar que
// la linea de codigo no acaba y se puede utilizar en la siguiente linea como parte de la misma.
let tasks = [];

// Configuración de la aplicación para que acepte datos en formato JSON:

// Use
app.use(express.json());
app.use(cors());

// Peticiones del servidor o endpoints:

// Get- Obtener tareas
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});
app.get('/',(req, res) => {
    res.send('Hello Backend!')
})
app.get('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(task);
});

// Post- Agregar tarea
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
// Put- Actualizar tarea
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

// Delete - Eliminar tarea
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tasks.splice(index, 1); // Borra la tarea
    res.status(204).send(); // 204: sin contenido, OK
});


// Inicializa el servidor
app.listen (PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

// Cambio realizado:
// 1. Se agregó `require('dotenv').config();` al inicio del archivo para cargar las variables de entorno.
// 2. Se actualizó la forma de definir el puerto para usar `process.env.PORT` si está definido, o `3000` como valor por defecto.
// 3. Se modificó el mensaje del console.log al iniciar el servidor para usar template literals.