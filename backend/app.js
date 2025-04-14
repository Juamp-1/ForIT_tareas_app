const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

let = tasks = []

app.use(express.json());


app.get('/api/tasks', (req, res) => {
    res.json(tasks); 
});  
app.get('/',(req, res) => {
    res.send('Hello World!')
})
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



app.listen (PORT, () => {
    console.log("Server runing on port http://localhost:" + PORT);
});