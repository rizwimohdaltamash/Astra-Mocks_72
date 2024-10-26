import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fireDB } from "../firebase/ConfigFirebase";
import { collection, getDocs } from "firebase/firestore";
import { IoArrowBackCircle } from "react-icons/io5";

const DashboardAdmin = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(fireDB, "quizResults"));
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8">
     <div className="absolute left-8 top-16 lg:left-12 lg:top-12" onClick={() => navigate('/intro')} >
            <button className="text-purple-400"><IoArrowBackCircle  size={40} /></button>
            
          </div>
      <h1 className="lg:text-3xl text-xl lg:font-bold text-white mb-6">  Users Who Registered and given the Mocks</h1>
      <div className="w-full max-w-4xl bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg lg:p-6 p-2">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">SrNo.</th>
              <th className="py-2 px-4 border-b border-gray-300">Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Email</th>
              <th className="py-2 px-4 border-b border-gray-300">Difficulty</th>
              <th className="py-2 px-4 border-b border-gray-300">Total Score</th>
              <th className="py-2 px-4 border-b border-gray-300">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user.id} className="text-center">
                <td className="py-2 px-4 border-b border-gray-300 ">{index + 1}.</td>
                <td className="py-2 px-4 border-b border-gray-300 text-blue-700 font-bold">{user.userName}</td>
                <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                <td className="py-2 px-4 border-b border-gray-300">{user.difficulty.charAt(0).toUpperCase() + user.difficulty.slice(1)}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-green-600 font-bold">{user.totalScore}/40</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {new Date(user.timestamp.seconds * 1000).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
