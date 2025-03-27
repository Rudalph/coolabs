"use client";
import React, { useState, FormEvent } from 'react';
import { User, Lock, UserPlus, ShieldUser } from 'lucide-react';

const AddUserForm = () => {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    
    if (!username || !password || !adminPassword) {
      alert('Please fill in all fields');
      return;
    }

    
    console.log({
      username,
      password,
      adminPassword
    });

    try {
      const response = await fetch("/api/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, adminPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully!");
        setUsername("");
        setPassword("");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to save user.");
    }
    setUsername('');
    setPassword('');
    setAdminPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-5">
      {/* Username Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <User className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
      </div>

      {/* Password Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
      </div>

      {/* Admin Password Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ShieldUser className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="password" 
          placeholder="Admin Password" 
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full flex items-center justify-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
      >
        <UserPlus className="mr-2 h-5 w-5" />
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;