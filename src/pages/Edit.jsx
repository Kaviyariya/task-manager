import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = ({ tasks, setTasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const taskToEdit = tasks.find((task) => task.id === Number(id));

  if (!taskToEdit)
    return <h2 className="text-center text-xl mt-10">Task not found!</h2>;

  const [title, setTitle] = useState(taskToEdit.title);
  const [description, setDescription] = useState(taskToEdit.description);
  const [status, setStatus] = useState(taskToEdit.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...taskToEdit,
      title,
      description,
      status,
    };

    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Edit Task
      </h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="w-full px-4 py-2 mb-4 border rounded resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
      >
        Update Task
      </button>
    </form>
  );
};

export default Edit;
