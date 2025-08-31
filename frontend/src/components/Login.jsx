import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import  UserContext  from "../context/UserContext.js";
import { useContext } from "react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
    
      if (!form.email || !form.password) {
        return setError("All fields are required.");
      }
      setError("");
      const res = await axios.post("http://localhost:3000/api/shorturl/login",
        {
          email:form.email, 
          password:form.password
        },
        {
          withCredentials:true
        })
        setUser(res.data.user)
      navigate("/")
      toast.success("Logged in successfully")
    } catch (error) {
      toast.error("Invalid email or password")
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-violet-200 to-violet-300 px-4 text-white">
      <div className="bg-violet-700 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold  text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full placeholder:text-white"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full placeholder:text-white pr-10"
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button type="submit" className="w-full cursor-pointer">Login</button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-400 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
