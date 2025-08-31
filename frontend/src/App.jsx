import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './components/HomePage'
import History from "./components/History"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Profile from "./components/Profile"
import Navbar from "./components/Navbar"
import About from "./components/About"

function App() {

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analytics" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </>
  )
}

export default App
