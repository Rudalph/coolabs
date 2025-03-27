"use client"
import React, { useState } from 'react';
import { User, Lock, LogIn } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/database/firebase";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const firebaseUser = userCredential.user;
      setUser(firebaseUser)
      router.push("/add_user");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-50"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
          filter: 'grayscale(0%)'
        }}
      />

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-lg bg-white shadow-2xl rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105">
        {/* Form Content */}
        <div className="px-10 py-12">
          {/* Form Header */}
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 animate-fade-in">
          Welcome to CooLabs!
          </h2>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Username Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors duration-300" />
              </div>
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 group-focus-within:border-black"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors duration-300" />
              </div>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 group-focus-within:border-black"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full flex items-center justify-center bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;