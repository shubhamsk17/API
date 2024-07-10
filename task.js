// Require necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Set up express.json() middleware for parsing JSON request bodies
app.use(express.json());

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/movies';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(-1);
});

// Define a schema (example: for a 'todos' collection)
const TodoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

// Create a model
const Todo = mongoose.model('Todo', TodoSchema);

// Define CRUD operations

// Create a new todo
app.post('/todos', (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    completed: req.body.completed || false
  });

  newTodo.save()
    .then(todo => res.json(todo))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Read all todos
app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Read a single todo by ID
app.get('/todos/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(todo);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update a todo by ID
app.put('/todos/:id', (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    completed: req.body.completed || false
  }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(todo);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json({ message: 'Todo deleted successfully' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
