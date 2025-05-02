const Todo = require('../models/todoModel');
const User = require('../models/userModel');


// Function to create a new todo item
const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res
              .status(400)
              .json({ error: "⚠️Please fill all the fields⚠️" });
        }

        // const user = await User.findById(userId);

        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }


        const newTodo = await Todo.create({
            title,
            description,
        });

        return res.status(201).json({
          success: true,
          message: "Todo created successfully!🥳🎉",
          todo: newTodo,
        });

    }
    catch (error) {
        console.error("Error in createTodo function:", error);
        return res.status(500).json({ error: "⚠️Internal server error⚠️" });
    }
}

// Function to get all todo items
const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({
            success: true,
            todos,
        });
    } catch (error) {
        console.error("Error in getAllTodos function:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Function to update a todo item
const updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const updatedDATA = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            updatedDATA,
            { new: true } // return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully!",
            todo: updatedTodo,
        });
    } catch (error) {
        console.error("Error in updateTodo function:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

//Function to delete a todo item
const deleteTodo = async (req, res) => {
    try{
        const { todoId } = req.params;

        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully!",
        });
    }
    catch (error) {
        console.error("Error in deleteTodo function:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { createTodo, getAllTodos, updateTodo, deleteTodo };