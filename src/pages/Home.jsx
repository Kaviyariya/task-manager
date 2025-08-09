import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ tasks = [], setTasks }) => {
  const navigate = useNavigate();

  const completedCount = useMemo(() => tasks.filter(t => t.completed).length, [tasks]);
  const pendingCount = tasks.length - completedCount;

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        (task.id ?? task._tempId) === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setTasks(prev => prev.filter(task => (task.id ?? task._tempId) !== id));
  };

  const editTask = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <header className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Your Tasks</h2>

        <div className="flex gap-4">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded shadow">
            Completed: {completedCount}
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow">
            Pending: {pendingCount}
          </div>
        </div>
      </header>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-20">No tasks yet. Create one!</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left">Title</th>
              <th className="border border-gray-300 p-3 text-left hidden md:table-cell">Description</th>
              <th className="border border-gray-300 p-3 text-left">Status</th>
              <th className="border border-gray-300 p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => {
              const id = task.id ?? task._tempId ?? idx;
              return (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium">{task.title}</td>
                  <td className="border border-gray-300 p-3 hidden md:table-cell">
                    {task.description?.length > 100
                      ? task.description.slice(0, 100) + "..."
                      : task.description}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {task.completed ? (
                      <span className="text-green-600 font-semibold">Completed</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => toggleComplete(id)}
                        className={`px-3 py-1 rounded text-sm font-medium transition ${
                          task.completed
                            ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                      >
                        {task.completed ? "Undo" : "Complete"}
                      </button>
                      <button
                        onClick={() => editTask(id)}
                        className="px-3 py-1 rounded text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(id)}
                        className="px-3 py-1 rounded text-sm font-medium bg-red-500 hover:bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;

