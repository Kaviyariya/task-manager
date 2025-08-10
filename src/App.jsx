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
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black text-white">
      {isLoggedIn ? (
        <>
          <nav className="w-full bg-gradient-to-r from-black via-red-900 to-black p-4 flex items-center gap-6 text-white font-semibold text-lg shadow-red-800 shadow-md">
            <Link to="/home" className="hover:underline">Home</Link>
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
              <Route path="/home" element={<Home tasks={tasks} setTasks={setTasks} />} />
              <Route path="/create" element={<Create setTasks={setTasks} />} />
              <Route path="/edit/:id" element={<Edit tasks={tasks} setTasks={setTasks} />} />
              
              {/* Show welcome message on root */}
              <Route
                path="/"
                element={
                  <div className="flex justify-center items-center h-[70vh]">
                    <h2 className="text-center text-white text-2xl font-bold">
                      Welcome to Task Manager, create your new task!
                    </h2>
                  </div>
                }
              />

              {/* Redirect unknown paths to /home */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </main>
        </>
      ) : (
        <LoginSignup setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
