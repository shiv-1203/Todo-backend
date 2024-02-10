const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors())

app.use(bodyParser.json());

// Temporary in-memory storage for todos
let todos = [];

// POST endpoint to add a new todo
app.post('/addTodo', (req, res) => {
  const { todo } = req.body;
  if (todo) {
    todos.push(todo);
    res.json({ message: 'Todo added successfully', todo });
  } else {
    res.status(400).json({ error: 'Invalid todo format' });
  }
});

// GET endpoint to fetch all todos
app.get('/getTodos', (req, res) => {
  res.json({ todos });
});


// DELETE endpoint to remove a todo
app.delete('/deleteTodo/:id', (req, res) => {
  const { id } = req.params;

  // Convert id to a number
  const todoId = parseInt(id, 10);

  // Find the todo with the given ID
  const todoToDelete = todos.find(todo => todo.id === todoId);

  if (todoToDelete) {
    // Remove the todo from the todos array
    todos = todos.filter(todo => todo.id !== todoId);
    res.json({ message: 'Todo deleted successfully', todo: todoToDelete });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Your other routes and logic here

app.listen(port, () => console.log(`Server running on port ${port}`));
