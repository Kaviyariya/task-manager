import React from "react";

const Home = ({ tasks, setTasks }) => {
  // Function to toggle complete status
  const toggleComplete = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  // Function to delete a task
  const deleteTask = (id) => {
    const filtered = tasks.filter((task) => task.id !== id);
    setTasks(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

      {tasks.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh] text-gray-300 text-xl font-semibold">
          No tasks yet. Create one to get started!
        </div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`p-4 rounded-lg shadow-md flex justify-between items-center transition ${
                task.completed
                  ? "bg-green-600 text-white line-through"
                  : "bg-white/10 text-white"
              }`}
            >
              <span>{task.title}</span>
              <div className="space-x-2">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`px-3 py-1 rounded ${
                    task.completed
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white transition`}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;

