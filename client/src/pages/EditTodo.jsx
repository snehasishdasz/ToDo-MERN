import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EditTodo = () => {
  const { id } = useParams(); // Get the todo ID from the URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch the current todo details
  const fetchTodo = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/todo/${id}`,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      if(res.data.success) {
        setTitle(res.data.todo.title);
        setDescription(res.data.todo.description);
      }
      
    } catch (error) {
      toast.error(error.response.data.error, {
        // position: "top-center",
        duration: 2000, // 3 seconds
      });
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  //Submit updated todo
  const updateTodoHandler = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/todo/edit/${id}`,
        { title, description },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/"); // Go back to home
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        // position: "top-center",
        duration: 2000, // 3 seconds
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Todo</h1>
      <div className="w-full max-w-xl flex flex-col space-y-6">
        <Input
          type="text"
          placeholder="Update Title"
          value={title}
          onChange={(e)=> setTitle(e.target.value) }
        />
        <Textarea
          placeholder="Update Description"
          value={description}
          onChange={(e)=> setDescription(e.target.value) }
        />
        <Button
          onClick={updateTodoHandler}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Update Todo ✅
        </Button>
      </div>
    </div>
  );
};

export default EditTodo;
