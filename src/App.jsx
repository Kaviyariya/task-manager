import Home from './pages/Home'
import Create from './pages/Create'
import Edit from './pages/Edit'
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black text-white">
      <div className="min-h-screen">
        <nav className="w-full bg-gradient-to-r from-black via-red-900 to-black p-4 flex items-center gap-6 text-white font-semibold text-lg shadow-red-800 shadow-md">
          <Link to="/home" className="hover:underline">Task Manager</Link>
          <Link to="/create" className="hover:underline">Create New Task</Link>
          <div className="flex-grow"></div>
          <span className="text-sm font-normal">Welcome to Task Manager</span>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home tasks={tasks} setTasks={setTasks} />} />
            <Route path="/home" element={<Home tasks={tasks} setTasks={setTasks} />} />
            <Route path="/create" element={<Create setTasks={setTasks} />} />
            <Route path="/edit/:id" element={<Edit tasks={tasks} setTasks={setTasks} />} />
            <Route path="*" element={<Home tasks={tasks} setTasks={setTasks} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
