import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate hook

const LoginSignup = ({ setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const containerRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate(); // ✅ initialize navigate

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUsername.trim() && loginPassword.trim()) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/"); // ✅ go directly to home after login
    } else {
      alert("Please enter both username and password.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupUsername.trim() && signupPassword.trim() && signupConfirmPassword.trim()) {
      if (signupPassword !== signupConfirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      alert("Signup successful! Please login.");
      setIsLogin(true);
      setSignupUsername("");
      setSignupPassword("");
      setSignupConfirmPassword("");
    } else {
      alert("Please fill all the fields.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div
        ref={containerRef}
        onClick={() => setClicked(true)}
        className={`relative bg-white bg-opacity-90 p-10 rounded-xl max-w-md w-full shadow-lg transition-shadow ${
          clicked ? "shadow-red-600 shadow-[0_0_20px_8px_rgba(220,38,38,0.6)]" : "shadow-md"
        }`}
      >
        <div className="flex justify-center mb-8 space-x-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-7 py-2 rounded-lg font-semibold transition ${
              isLogin
                ? "bg-red-600 text-white shadow-lg shadow-red-500/70"
                : "bg-red-100 text-red-600 hover:bg-red-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-7 py-2 rounded-lg font-semibold transition ${
              !isLogin
                ? "bg-red-600 text-white shadow-lg shadow-red-500/70"
                : "bg-red-100 text-red-600 hover:bg-red-200"
            }`}
          >
            Signup
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4 select-none">
          Task Manager
        </h1>
        <p className="text-center text-gray-700 mb-8 select-none">
          {isLogin ? "Sign in to manage your tasks" : "Create a new account"}
        </p>

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-300 outline-none text-gray-900"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-300 outline-none text-gray-900"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-300 outline-none text-gray-900"
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-300 outline-none text-gray-900"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={signupConfirmPassword}
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-300 outline-none text-gray-900"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition"
            >
              Signup
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
