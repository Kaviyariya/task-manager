import Home from './pages/Home';
import Create from './pages/Create';
import Edit from './pages/Edit';
import LoginSignup from './pages/Login'; // login/signup page
import { Routes, Route, Link, useLocation } from "react-router-dom";
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

  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white shadow px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <Link
            to="/"
            className={`px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition ${
              location.pathname === "/" ? "bg-gray-300" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={`px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition ${
              location.pathname === "/create" ? "bg-gray-300" : ""
            }`}
          >
            Create Task
          </Link>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            setIsLoggedIn(false);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex justify-center items-start p-8 bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-8">
          <Routes>
            <Route path="/" element={<Home tasks={tasks} setTasks={setTasks} />} />
            <Route path="/create" element={<Create setTasks={setTasks} />} />
            <Route path="/edit/:id" element={<Edit tasks={tasks} setTasks={setTasks} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

