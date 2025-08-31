import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext.js";
import { useContext } from "react";

const Navbar = () => {
  // const [user, setUser] = useState(null);

  const {user,setUser} = useContext(UserContext);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/shorturl/current", {
        withCredentials: true,
      });
      setUser(res.data.user);
      // setUser(true)
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  },[location.pathname])


  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600  p-4 pl-6 flex justify-between shadow-lg fixed w-full">
      <div className="text-white text-3xl font-extrabold tracking-wide">🔗 URL Shortener</div>
      <div className="flex gap-6 items-center">
        {!user ? (
          <>
            <Link to="/login">
              <button className="text-white font-semibold text-lg hover:bg-white hover:text-indigo-700 px-5 py-1 rounded-full duration-200 ease-in-out hover:scale-105">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-white text-indigo-700 font-semibold text-lg px-5 py-1 rounded-full duration-200 ease-in-out hover:scale-105">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/about">
              <p className="text-white font-semibold text-xl mr-10 hover:bg-violet-700 px-3 py-1 rounded-full text-center ">About</p>
            </Link>
            <p className="text-white hidden md:block text-lg">Hi, {user.name}</p>
            <Link to="/profile">
              <button className="bg-white text-indigo-700 font-bold text-2xl w-10 h-10 flex items-center justify-center rounded-full duration-200 hover:scale-105">
                {user.name.charAt(0).toUpperCase()}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>

  );
};

export default Navbar;
