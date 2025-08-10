import Home from './pages/Home'
import Create from './pages/Create'
import Edit from './pages/Edit'
import LoginSignup from './pages/Login'
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import './App.css'

function App() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <>
      <nav className=" w-full bg-blue-600 p-4 flex justify-center items-center gap-6 text-white font-semibold text-lg shadow-md ">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span>|</span>
        <Link to="/create" className="hover:underline">
          Create New Task
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Home tasks={tasks} setTasks={setTasks} />}
        ></Route>
        <Route path="/create" element={<Create setTasks={setTasks} />}></Route>
        <Route
          path="/edit/:id"
          element={<Edit tasks={tasks} setTasks={setTasks} />}
        />
      </Routes>
    </>
  );
}

export default App
