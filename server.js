const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define the Task schema
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: String
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get a single task by ID
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
