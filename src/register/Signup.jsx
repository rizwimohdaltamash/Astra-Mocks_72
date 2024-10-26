/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { auth, fireDB } from "../firebase/ConfigFirebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { AiFillDingtalkCircle } from "react-icons/ai";

// import Loader from "../../components/loader/Loader";

const Signup = () => {
  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // Google Provider
  const provider = new GoogleAuthProvider();

  /**========================================================================
   *                          User Signup Function
   *========================================================================**/

  const userSignupFunction = async () => {
    // validation
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("All Fields are required");
    }

   
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      // create user object
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // create user Refrence
      const userRefrence = collection(fireDB, "user");

      // Add User Detail
     await addDoc(userRefrence, user);

     // Store user data in localStorage
     localStorage.setItem("users", JSON.stringify(user));

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signup Successfully");     
      navigate("/intro");
    } catch (error) {
      console.log(error);
      toast.error("Signup Failed");
    }
  };

  /**========================================================================
   *                          Google Signup Function
   *========================================================================**/
  const googleSignupFunction = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      const newUser = {
        name: user.displayName || "No Name",
        email: user.email,
        uid: user.uid,
        role: "user",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userRefrence = collection(fireDB, "user");
      await addDoc(userRefrence, newUser);
      localStorage.setItem("users", JSON.stringify(newUser));

      toast.success("Signup Successful with Google");
      navigate("/intro");
    } catch (error) {
      console.log(error);
      toast.error("Google Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {/* {loading && <Loader/>} */}
      {/* Login Form  */}
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg px-8 py-10 rounded-lg shadow-md w-[90%] md:w-[50%] lg:w-[30%]">
        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-6">
          <AiFillDingtalkCircle size={64} className="text-white" />
          <h2 className="text-center text-3xl font-bold text-white mt-2">
            Signup
          </h2>
        </div>


        {/* Input One  */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            value={userSignup.name}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                name: e.target.value,
              });
            }}
            className="bg-gray-700 text-white px-4 py-3 w-full rounded-md outline-none placeholder-white"
          />
        </div>

        {/* Input Two  */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                email: e.target.value,
              });
            }}
            className="bg-gray-700 text-white px-4 py-3 w-full rounded-md outline-none placeholder-white"
          />
        </div>

        {/* Input Three  */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={userSignup.password}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                password: e.target.value,
              });
            }}
            className="bg-gray-700 text-white px-4 py-3 w-full rounded-md outline-none placeholder-white"
          />
        </div>

        {/* Signup Button  */}
        <div className="mb-5">
          <button
            type="button"
            onClick={userSignupFunction}
            className="bg-blue-600 border-2 border-blue-700 hover:bg-blue-700 w-full text-white py-3 font-bold rounded-md transition duration-200 "
          >
            Signup
          </button>
        </div>

        {/* Google Signup Button */}
        <div className="mb-5">
          <button
            type="button"
            onClick={googleSignupFunction}
            className="bg-red-600 border-2 border-red-700 hover:bg-red-700 w-full text-white py-3 font-bold rounded-md transition duration-200"
          >
            Signup with Google
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-white">
            Have an account{" "}
            <Link className=" text-blue-600 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
