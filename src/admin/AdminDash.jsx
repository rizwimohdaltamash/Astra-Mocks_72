import React, { useState, useEffect } from "react";
import { fireDB } from "../firebase/ConfigFirebase";
import { collection, getDocs } from "firebase/firestore";

const AdminDash = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(fireDB, "user"));
      const userList = querySnapshot.docs.map((doc, index) => ({
        srNo: index + 1,
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Registered Users</h1>
      <div className="w-full max-w-4xl bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg lg:p-6 p-2">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">SrNo.</th>
              <th className="py-2 px-4 border-b border-gray-300">Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Email</th>
              <th className="py-2 px-4 border-b border-gray-300">Role</th>
              <th className="py-2 px-4 border-b border-gray-300">Time</th>
              <th className="py-2 px-4 border-b border-gray-300">UID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="py-2 px-4 border-b border-gray-300">{user.srNo}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-blue-800 font-bold">{user.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-green-600 font-bold">{user.role}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {new Date(user.time.seconds * 1000).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">{user.uid}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
