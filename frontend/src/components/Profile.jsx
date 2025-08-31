import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiCalendar, FiHome, FiBarChart2, FiLink2, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [newName, setNewName] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/shorturl/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleEdit = async () => {
    try {
      if (!name) {
        return toast.error("Enter name");
      }

      await axios.put(
        "http://localhost:3000/shorturl/edituser",
        { name },
        { withCredentials: true }
      );
      setNewName(false);
      toast.success("User updated successfully");
      fetchProfile(); // refresh profile after update
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/profile", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse rounded-full h-12 w-12 bg-indigo-500"></div>
      </div>
    );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-indigo-600">Dashboard</h2>
          </div>

          <div className="flex flex-col p-4 gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
            >
              <FiHome className="text-indigo-600" /> <span>Home</span>
            </button>

            <button
              onClick={() => navigate("/analytics")}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
            >
              <FiBarChart2 className="text-indigo-600" /> <span>Analytics</span>
            </button>

            {/* ✅ New URL Shortener field */}
            {/* <button
              onClick={() => navigate("/shorten")}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
            >
              <FiLink2 className="text-indigo-600" /> <span>URL Shortener</span>
            </button> */}
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full rounded-lg transition"
          >
            <FiLogOut /> <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 mt-16">
        <div className="container mx-auto px-6 py-10">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-indigo-500 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-indigo-100">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              {/* Name */}
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-500 mr-4">
                  <FiUser size={20} />
                </div>
                <div className="flex justify-between w-full items-center">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h3>

                    {newName ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 mt-1"
                      />
                    ) : (
                      <p className="font-medium text-gray-900">{user.name}</p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (newName) {
                        handleEdit();
                      } else {
                        setNewName(true);
                        setName(user.name);
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded"
                  >
                    {newName ? "Save" : "Edit"}
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-500 mr-4">
                  <FiMail size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Email Address
                  </h3>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-500 mr-4">
                  <FiCalendar size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Member Since
                  </h3>
                  <p className="font-medium text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Profile;
