  import React, { useState,useEffect } from "react";
  import { login ,logout,getProfile} from "../services/api";
  import { useNavigate,Link } from "react-router-dom";

  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

  useEffect(()=>{
    const clearcookie=async ()=>{
      try{
        await logout();
      }
      catch(Err)
      {
        console.log(Err);
      }
    }

    clearcookie();
  },[])

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    await login({ email, password });

    const res = await getProfile(); // ✅ this is the full Axios response
    console.log("✅ Logged in as:", res.data.user); // ✅ access .data.user

    navigate("/dashboard");
  } catch (err) {
    console.error("❌ Login error:", err);
    setError(err.response?.data?.message || "Login failed");
  }
};





    return (
      <div className="max-w-sm mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
          >
            Login
          </button>

<Link to="/register" >Don't have an account? Register</Link>

        </form>
      </div>
    );
  };

  export default Login;
