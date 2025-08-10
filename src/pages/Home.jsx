import React from "react";
import { Link } from "react-router-dom";

const Home = ({ tasks, setTasks }) => {
  // Debug logging
  console.log("Home component loaded, tasks:", tasks);

  // Function to toggle complete status
  const toggleComplete = (id) => {
    const updated = tasks.map((task) =>
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            status: !task.completed ? "Completed" : "Pending"
          } 
        : task
    );
    setTasks(updated);
  };

  // Function to delete a task
  const deleteTask = (id) => {
    const filtered = tasks.filter((task) => task.id !== id);
    setTasks(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Your Tasks</h2>
        <Link 
          to="/create" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Add New Task
        </Link>
      </div>

      {/* Debug info */}
      <div className="mb-4 p-2 bg-white/10 rounded text-sm">
        Debug: {tasks.length} tasks found
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[60vh] text-gray-300 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-semibold mb-2 text-white">No tasks yet!</h3>
          <p className="text-lg mb-6 text-gray-300">Create your first task to get started</p>
          <Link 
            to="/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition text-lg"
          >
            Create Your First Task
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-6 rounded-lg shadow-md transition ${
                task.completed
                  ? "bg-green-600/20 border border-green-500"
                  : "bg-white/10 border border-white/20"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold ${
                    task.completed ? "line-through text-green-400" : "text-white"
                  }`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className={`mt-2 ${
                      task.completed ? "line-through text-green-300" : "text-gray-300"
                    }`}>
                      {task.description}
                    </p>
                  )}
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                    task.completed || task.status === "Completed"
                      ? "bg-green-600 text-white" 
                      : "bg-yellow-600 text-white"
                  }`}>
                    {task.status || (task.completed ? "Completed" : "Pending")}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 ml-4">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      task.completed
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {task.completed ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                  <Link
                    to={`/edit/${task.id}`}
                    className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
