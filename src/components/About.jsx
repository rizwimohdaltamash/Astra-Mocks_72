import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDingtalkCircle , AiOutlineMenu, AiOutlineClose} from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore"; // Import getDocs to fetch documents
import { fireDB } from "../firebase/ConfigFirebase"; // Ensure you have the correct path to ConfigFirebase
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import { GoGoal } from "react-icons/go";
import { MdAdminPanelSettings } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

const About = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  // get user from localStorage
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // navigate
  const navigate = useNavigate();

 

  // logout function
  const logout = () => {
    localStorage.removeItem("users");
    navigate("/login");
  };

  return (
   <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {/* Navigation Bar */}
      <nav className="w-full bg-gray-100 shadow-lg sticky top-0 z-50">
        <div className=" mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo on the extreme left */}
          <div className="flex flex-row justify-center items-center text-2xl font-bold text-blue-500">
            <AiFillDingtalkCircle size={28} />
            Astra-Mocks
          </div>

           {/* Hamburger Icon for Mobile */}
           <div className="md:hidden">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>

          {/* Navigation Links on the extreme right (hidden or mobile)*/}
          <div className="hidden md:flex gap-8">

          <Link
              to="/intro"
              className="text-gray-600 text-lg hover:text-gray-500"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-gray-600 text-lg hover:text-gray-500"
            >
              About
            </Link>

            {/* Login */}
            {!user ? (
              <Link
                to="/login"
                className="text-gray-600 text-lg hover:text-gray-500"
              >
                Login
              </Link>
            ) : (
              ""
            )}

            {/* Signup */}
            {!user ? (
              <Link
                to="/signup"
                className="text-gray-600 text-lg hover:text-gray-500"
              >
                Signup
              </Link>
            ) : (
              ""
            )}

            {/* Admin */}
            {user?.role === "admin" && (
              <Link
                to="/admindashboard"
                className="text-gray-600 text-lg hover:text-gray-500"
              >
                {user?.name}
              </Link>
            )}

{user?.role === "admin" && (
              <Link
                to="/admindash"
                className="text-gray-600 text-lg hover:text-gray-500"
              >
                {/* {user?.name} */}
                Registered Users
              </Link>
            )}

            {/* Logout */}
            {user && (
              <button
                onClick={logout}
                className="text-gray-800 text-lg hover:text-gray-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar for Mobile (visible only on mobile) */}
      {isSidebarOpen && (
        <div className="md:hidden bg-gray-100 fixed top-0 left-0 w-56 h-full z-40 shadow-lg">
          <div className="flex flex-col gap-6 p-6 mt-12">
            <Link to="/intro" className="text-gray-600 flex flex-row items-center gap-2  text-lg hover:text-gray-500" onClick={() => setIsSidebarOpen(false)}>
            <div> < FaHome />  </div>
            <h1> Home</h1>   
            </Link>
            <Link to="/about" className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500" onClick={() => setIsSidebarOpen(false)}>
            <div> < AiOutlineInfoCircle />  </div>
             <h1> About</h1>         
            </Link>

            {/* Login */}
            {!user ? (
              <Link to="/login" className="text-gray-600 flex flex-row items-center gap-2  text-lg hover:text-gray-500" onClick={() => setIsSidebarOpen(false)}>
                <div><CiLogin /></div> 
                <h1> Login</h1>         
              </Link>
            ) : null}

            {/* Signup */}
            {!user ? (
              <Link to="/signup" className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500" onClick={() => setIsSidebarOpen(false)}>
                <div> <GoGoal /></div>
                <h1>Signup</h1>
                
              </Link>
            ) : null}

            {/* Admin */}
            {user?.role === "admin" && (
              <>
                <Link to="/admindashboard" className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500" onClick={() => setIsSidebarOpen(false)}>
                 <div><RiAdminLine/></div>
                  <h1> {user?.name}</h1>
                </Link>
                <Link to="/admindash" className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500" onClick={() => setIsSidebarOpen(false)}>
                 <div><MdAdminPanelSettings/></div>
                  <h1> Registered Users</h1>
                </Link>
              </>
            )}

            {/* Logout */}
            {user && (
              <button onClick={() => { logout(); setIsSidebarOpen(false); }} className="text-white flex flex-row items-center justify-center gap-2 rounded-md bg-blue-600 text-lg hover:bg-blue-700">
               
               <div><CiLogout /></div>
               <h1>Logout</h1>
                
              </button>
            )}
          </div>
        </div>
      )}

     
      {/* Main Content */}
      <div className="flex flex-col  lg:w-[70vw] w-[95vw] my-4 items-center justify-center flex-1 bg-black bg-opacity-10 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
        <h1 className="text-4xl font-bold text-white mb-6">Astra-Mocks</h1>
        <p className="lg:text-xl text-lg text-white mb-4 max-w-3xl text-center">
          This website is designed to make coding easier for users. You can take the same mock test an infinite number of times and always see the solutions after each mock test. This helps you to correct the mistakes you made during the test.
        </p>
        <p className="lg:text-xl text-lg text-white mb-4 max-w-3xl text-center">
          Each section contains three difficulty levels: Easy, Medium, and Hard, with each section worth 40 marks. You will receive <span className="text-yellow-400">+4</span>  marks for a correct answer, <span className="text-yellow-400" >-1</span>  mark for an incorrect answer, and <span className="text-yellow-400">0</span> mark for an unanswered question.
        </p>
        <p className="lg:text-xl text-lg text-white max-w-3xl text-center">
          This is just an attempt from me to make learning easier and more effective. Enjoy your journey of mastering coding with Astra-Mocks!
        </p>
      </div>

      </div>
  )
}

export default About
