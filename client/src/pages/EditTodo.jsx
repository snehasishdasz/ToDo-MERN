import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import Navbar from "./Navbar"; // Import your Navbar component

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the current todo details
  const fetchTodo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/api/v1/todo/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        setTitle(res.data.todo.title);
        setDescription(res.data.todo.description);
      }
    } catch (error) {
      toast.error(error.response.data.error, { duration: 2000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

  // Submit updated todo
  const updateTodoHandler = async () => {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/todo/edit/${id}`,
        { title, description },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response.data.error, { duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0C29] via-[#302b63] to-[#24243e] flex flex-col overflow-hidden relative">
      {/* Navbar at the top */}
      <Navbar />

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-xl">
          {/* Back button */}
          <button
            onClick={() => navigate("/home")}
            className="mb-6 flex items-center gap-2 text-[#bcb7e3] hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Tasks</span>
          </button>

          {/* Main card */}
          <div className="backdrop-blur-md bg-[#1a1530]/80 border border-[#2A2250] rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-white mb-2">Edit Task</h1>
            <p className="text-[#bcb7e3] mb-8">
              Update your task details below
            </p>

            {loading ? (
              <div className="space-y-4">
                <div className="h-12 w-full bg-[#2A2250]/50 animate-pulse rounded-lg"></div>
                <div className="h-32 w-full bg-[#2A2250]/50 animate-pulse rounded-lg"></div>
                <div className="h-12 w-full bg-[#2A2250]/50 animate-pulse rounded-lg"></div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm text-[#bcb7e3] mb-2"
                  >
                    Task Title
                  </label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-[#2A2250]/50 border-[#2A2250] text-white placeholder:text-gray-400 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm text-[#bcb7e3] mb-2"
                  >
                    Task Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-[#2A2250]/50 border-[#2A2250] text-white placeholder:text-gray-400 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all min-h-[120px]"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                    onClick={() => navigate("/home")}
                    className="flex-1 bg-[#2A2250] hover:bg-[#211a45] text-white rounded-xl py-3 transition-all"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={updateTodoHandler}
                    className="flex-1 bg-gradient-to-r from-[#6C63FF] to-[#5335b7] hover:opacity-90 text-white font-medium rounded-xl py-3 flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Save size={18} />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
