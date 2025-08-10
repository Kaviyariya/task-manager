import Home from './pages/Home'
import Create from './pages/Create'
import Edit from './pages/Edit'
import LoginSignup from './pages/Login'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  if (!isLoggedIn) {
    return <LoginSignup setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <>
      <nav className="w-full bg-blue-600 p-4 flex justify-center items-center gap-6 text-white font-semibold text-lg shadow-md">
        <Link to="/home" className="hover:underline">Home</Link>
        <span>|</span>
        <Link to="/create" className="hover:underline">Create New Task</Link>
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            setIsLoggedIn(false);
          }}
          className="ml-auto text-white underline hover:no-underline"
        >
          Logout
        </button>
      </nav>

      <Routes>
        <Route path="/home" element={<Home tasks={tasks} setTasks={setTasks} />} />
        <Route path="/create" element={<Create setTasks={setTasks} />} />
        <Route path="/edit/:id" element={<Edit tasks={tasks} setTasks={setTasks} />} />

        {/* Default route for "/" shows welcome message */}
        <Route
        path="/"
        element={
             <div className="text-center text-white text-2xl mt-10">
             Welcome to Task Manager, create your new task!
             </div>
        }
        />

        {/* Redirect all other unknown paths to /home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
