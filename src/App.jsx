import Home from './pages/Home'
import Create from './pages/Create'
import Edit from './pages/Edit'
import LoginSignup from './pages/Login'
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  if (!isLoggedIn) {
    return <LoginSignup setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black text-white">
      <nav className="w-full bg-gradient-to-r from-black via-red-900 to-black p-4 flex items-center gap-6 text-white font-semibold text-lg shadow-red-800 shadow-md">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/create" className="hover:underline">Create New Task</Link>
        <div className="flex-grow"></div>
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            setIsLoggedIn(false);
          }}
          className="hover:underline"
        >
          Logout
        </button>
      </nav>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home tasks={tasks} setTasks={setTasks} />} />
          <Route path="/create" element={<Create setTasks={setTasks} />} />
          <Route path="/edit/:id" element={<Edit tasks={tasks} setTasks={setTasks} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
