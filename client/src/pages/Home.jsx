import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from './Navbar';
import Cookies from "js-cookie";

const Home = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  // ADD TODO HANDLER
  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-right",
          duration: 3000, // Keeps toast for 3 seconds
        });
        setTitle("");
        setDescription("");
        fetchTodos();
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        // position: "top-center",
        duration: 3000, // 3 seconds
      });
      // Redirect to login if unauthorized
      navigate("/login");

      console.log(error);
    }
  };

  // FETCHING ALL TODOS
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/todo", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        setTodos(res.data.todos);
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        duration: 3000, // 3 seconds
      });
    }
  };
  // DELETE TODO HANDLER
  const deleteTodoHandler = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/todo/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message, { position: "top-right" });
        fetchTodos(); // Refresh the list
      }
    } catch (error) {
      toast.error(error.response.data.error, { position: "top-right" });
    }
  };


  useEffect(() => {
    const token = Cookies.get("token"); // 'token' is the cookie name

    if (!token) {
      navigate("/login");
    }
  }, []);

    useEffect(() => {
      fetchTodos();
    }, [])



    return (
      <>
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <div className="flex flex-col items-center mt-12 space-y-8">
            {/* Input Title */}
            <Input
              type="text"
              placeholder="Add a Title"
              className="w-full max-w-xl p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            {/* Textarea Description */}
            <Textarea
              placeholder="Write a description"
              className="w-full max-w-xl p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all resize-none"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            {/* Add Todo Button */}
            <Button
              className="w-full max-w-xl py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              onClick={addTodoHandler}
            >
              Add Todo 🚀
            </Button>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 w-full">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className="relative bg-gray-800 text-white p-5 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition duration-200"
                >
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">
                    {todo.title}
                  </h3>
                  <p className="text-gray-300">{todo.description}</p>
                  <button
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this todo?"
                      );
                      if (confirmDelete) {
                        deleteTodoHandler(todo._id);
                      }
                    }}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-transform hover:scale-110 text-xl cursor-pointer"
                    title="Delete"
                  >
                    <MdDelete />
                  </button>

                  {/* Edit Todo Button */}
                  <Link
                    to={`/todo/edit/${todo._id}`}
                    className="absolute bottom-3 right-3 text-yellow-400 hover:text-yellow-500 transition cursor-pointer"
                    title="Edit"
                  >
                    <BiSolidMessageSquareEdit />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

export default Home;