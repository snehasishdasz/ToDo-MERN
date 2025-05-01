import React from 'react'
import { Button } from "@/components/ui/button";

import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Navbar from './Navbar';

const Home = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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
            // position: "top-center",
            duration: 3000, // Keeps toast for 3 seconds
          });
        }
      } catch (error) {
        toast.error(error.response.data.error, {
          // position: "top-center",
          duration: 3000, // 3 seconds
        });

        console.log(error);
      }
    };


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
        </div>
      </div>
    </>
  );
}

export default Home