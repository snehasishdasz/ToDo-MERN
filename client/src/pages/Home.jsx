import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MdDelete, MdAdd, MdLogout } from "react-icons/md";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  // ADD TODO HANDLER
  const addTodoHandler = async () => {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    try {
      const res = await axios.post(
        "https://todo-mern-server-ust8.onrender.com/api/v1/todo",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTitle("");
        setDescription("");
        fetchTodos();
      }
    } catch (error) {
      toast.error(error.response.data.error);
      navigate("/login");
    }
  };

  // FETCHING ALL TODOS
  const fetchTodos = async () => {
    try {
      const res = await axios.get("https://todo-mern-server-ust8.onrender.com/api/v1/todo", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) setTodos(res.data.todos);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  // DELETE TODO HANDLER
  const deleteTodoHandler = async (id) => {
    try {
      const res = await axios.delete(
        `https://todo-mern-server-ust8.onrender.com/api/v1/todo/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchTodos();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) navigate("/login");
    else fetchTodos();
  }, [navigate]);


  return (
    <div className="min-h-screen bg-[#0F0C29] text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#6A5ACD]/10 blur-[100px]"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-[#8A2BE2]/10 blur-[100px]"></div>
      </div>

      <main className="relative max-w-7xl mx-auto px-4 pt-20 pb-8 flex flex-col gap-12">
        {/* Input Section */}
        <section className="w-full max-w-2xl mx-auto">
          <div className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-purple-900/30 shadow-xl">
            <h2 className="text-xl font-bold mb-6">Create New Todo</h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Task title"
                  className="w-full bg-black/30 border border-purple-900/30 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  placeholder="Task description"
                  className="w-full bg-black/30 border border-purple-900/30 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-24"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <button
                onClick={addTodoHandler}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <MdAdd size={20} /> Add Task
              </button>
            </div>
          </div>
        </section>

        {/* Tasks Section */}
        <section className="w-full">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            Your Tasks{" "}
            <span className="ml-2 text-sm font-normal bg-black/30 px-2 py-1 rounded-full">
              {todos.length}
            </span>
          </h2>

          {todos.length === 0 ? (
            <div className="text-center py-12 backdrop-blur-md bg-black/20 rounded-2xl border border-purple-900/30">
              <p className="text-gray-400">
                No tasks yet. Create one to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todos.map((todo) => (
                <motion.div
                  key={todo._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-purple-900/30 shadow-xl h-full flex flex-col hover:shadow-purple-900/10 hover:scale-[1.02] transition-all"
                >
                  <h3 className="text-xl font-semibold text-purple-400 mb-3 pr-10">
                    {todo.title}
                  </h3>
                  <p className="text-gray-300 mb-6 flex-grow">
                    {todo.description}
                  </p>
                  <div className="flex justify-end gap-2 mt-auto">
                    <Link
                      to={`/todo/edit/${todo._id}`}
                      className="p-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 transition-all"
                      title="Edit"
                    >
                      <BiSolidMessageSquareEdit size={20} />
                    </Link>
                    <button
                      onClick={() => {
                        if (window.confirm("Delete this task?")) {
                          deleteTodoHandler(todo._id);
                        }
                      }}
                      className="p-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                      title="Delete"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
