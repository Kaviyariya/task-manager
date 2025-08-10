import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = ({ setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      status: "Pending" // Added status property for consistency with Edit component
    };

    setTasks(prev => [...prev, newTask]);
    navigate("/home"); // Changed from "/" to "/home" for consistency
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Create New Task</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-8 max-w-xl mx-auto"
      >
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded shadow transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Create;
