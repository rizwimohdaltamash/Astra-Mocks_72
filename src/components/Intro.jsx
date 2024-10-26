import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth method
// import { auth } from "../firebase/ConfigFirebase"; // Make sure this points to your Firebase auth configuration
import { collection, getDocs } from "firebase/firestore"; // Import getDocs to fetch documents
import { fireDB } from "../firebase/ConfigFirebase"; // Ensure you have the correct path to ConfigFirebase
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  AiFillDingtalkCircle,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { GoGoal } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import ReactJS from "../assets/rct1.jpg";
import JS from "../assets/js1.jpg";
import Node from "../assets/node3.jpg";
import Express from "../assets/express.jpg";
import Mongo from "../assets/mon.jpg";

const Intro = () => {
  const [userCount, setUserCount] = useState(0); // State to hold user count
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  // get user from localStorage
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // navigate
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if a user is authenticated on component mount
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // If the user is authenticated, navigate to the dashboard or desired page
  //       navigate("/intro");
  //     }
  //   });

  //   return () => unsubscribe(); // Cleanup the observer
  // }, [navigate]);

  useEffect(() => {
    const fetchUserCount = async () => {
      const querySnapshot = await getDocs(collection(fireDB, "user"));
      setUserCount(querySnapshot.size); // Set the fetched user count
    };

    fetchUserCount();
  }, []);

  // logout function
  const logout = () => {
    localStorage.removeItem("users");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
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
              {isSidebarOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
          </div>

          {/* Navigation Links on the extreme right (hidden on mobile)*/}
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
            <Link
              to="/intro"
              className="text-gray-600 flex flex-row items-center gap-2  text-lg hover:text-gray-500"
              onClick={() => setIsSidebarOpen(false)}
            >
              <div>
                {" "}
                <FaHome />{" "}
              </div>
              <h1> Home</h1>
            </Link>
            <Link
              to="/about"
              className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500"
              onClick={() => setIsSidebarOpen(false)}
            >
              <div>
                {" "}
                <AiOutlineInfoCircle />{" "}
              </div>
              <h1> About</h1>
            </Link>

            {/* Login */}
            {!user ? (
              <Link
                to="/login"
                className="text-gray-600 flex flex-row items-center gap-2  text-lg hover:text-gray-500"
                onClick={() => setIsSidebarOpen(false)}
              >
                <div>
                  <CiLogin />
                </div>
                <h1> Login</h1>
              </Link>
            ) : null}

            {/* Signup */}
            {!user ? (
              <Link
                to="/signup"
                className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500"
                onClick={() => setIsSidebarOpen(false)}
              >
                <div>
                  {" "}
                  <GoGoal />
                </div>
                <h1>Signup</h1>
              </Link>
            ) : null}

            {/* Admin */}
            {user?.role === "admin" && (
              <>
                <Link
                  to="/admindashboard"
                  className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <div>
                    <RiAdminLine />
                  </div>
                  <h1> {user?.name}</h1>
                </Link>
                <Link
                  to="/admindash"
                  className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <div>
                    <MdAdminPanelSettings />
                  </div>
                  <h1> Registered Users</h1>
                </Link>
              </>
            )}

            {/* Logout */}
            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsSidebarOpen(false);
                }}
                className="text-white flex flex-row items-center justify-center gap-2 rounded-md bg-blue-600 text-lg hover:bg-blue-700"
              >
                <div>
                  <CiLogout />
                </div>
                <h1>Logout</h1>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Intro Content */}
      <div className="h-[60vh] flex-grow flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="flex flex-col justify-center items-center text-white text-center  lg:w-[50%] w-[90%] p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
          <h1 className="lg:text-4xl md:text-6xl text-4xl lg:font-extrabold font-semibold mb-4">
            Welcome to Astra-Mocks,{" "}
            <span className="text-yellow-400">{user?.name}</span>
          </h1>
          <p className="mt-4 lg:text-2xl md:text-2xl text-lg font-medium lg:w-[60%]">
            Start your journey to mastering technical interviews!
          </p>
          <div className="mt-6">
            <p className="text-lg md:text-2xl font-semibold">
              <span className="text-yellow-400">{userCount}</span> users have
              already registered so far.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6 bg-white">
        {/* Card 1 */}

        <div
          className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => navigate(user ? "/reactjs" : "/login")}
        >
          <img
            src={ReactJS}
            alt="Card 1"
            className="w-[80%] h-42 object-cover rounded-md mx-auto"
          />
          <h3 className="mt-4 text-lg font-semibold">React JS</h3>
        </div>

        {/* Card 2 */}
        <div
          className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => navigate(user ? "/javascript" : "/login")}
        >
          <img
            src={JS}
            alt="Card 2"
            className="w-[80%] h-42 object-cover rounded-md mx-auto"
          />
          <h3 className="mt-4 text-lg font-semibold">Java Script</h3>
        </div>

        {/* Card 3 */}

        <div
          className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => navigate(user ? "/nodejs" : "/login")}
        >
          <img
            src={Node}
            alt="Card 3"
            className="w-full h-40 object-cover rounded-md mx-auto"
          />
          <h3 className="mt-4 text-lg font-semibold">Node JS</h3>
        </div>

        {/* Card 4 */}

        <div
          className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => navigate(user ? "/express" : "/login")}
        >
          <img
            src={Express}
            alt="Card 4"
            className="w-full h-40 object-cover rounded-md mx-auto"
          />
          <h3 className="mt-4 text-lg font-semibold">Express JS</h3>
        </div>

        {/* Card 5 */}

        <div
          className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => navigate(user ? "/mongodb" : "/login")}
        >
          <img
            src={Mongo}
            alt="Card 5"
            className="w-full h-40 object-cover rounded-md mx-auto"
          />
          <h3 className="mt-4 text-lg font-semibold">Mongo DB</h3>
        </div>
      </div>
    </div>
  );
};

export default Intro;
