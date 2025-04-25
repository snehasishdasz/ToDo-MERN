import "./App.css";
import { Button } from "@/components/ui/button";
import Navbar from "./pages/Navbar";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center mt-12 space-y-8">
        {/* Input Title */}
        <Input
          type="text"
          placeholder="Add a Title"
          className="w-full max-w-xl p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
        />

        {/* Textarea Description */}
        <Textarea
          placeholder="Write a description"
          className="w-full max-w-xl p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all resize-none"
        />

        {/* Add Todo Button */}
        <Button className="w-full max-w-xl py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
          Add Todo 🚀
        </Button>
      </div>
    </div>
  );
}

export default App;
