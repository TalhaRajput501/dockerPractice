import { ToDo } from "../models/todo.model.js";

// Get all todos
export async function readToDo(req, res) {
  try {
    const todos = await ToDo.find();
    res.json(todos);    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
} 

// Add a new todo
export async function addToDO(req, res) {
  try {
    const { message } =   req.body;
    const newTodo = new ToDo({ message });
    const savedTodo = await newTodo.save(); 

    res.status(201).json({
      message: 'Todo added successfully',
      todo: savedTodo
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update a todo by ID
export async function updateToDO(req, res) {
  try {
    const { id } = req.params;
    const updatedTodo = await ToDo.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete a todo by ID
export async function deleteToDO(req, res) {
  try {
    const { id } = req.params;
    const deletedTodo = await ToDo.findByIdAndDelete(id);
    if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
