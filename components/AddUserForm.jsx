"use client";
import React from 'react';
import { User, Lock, UserPlus, ShieldUser } from 'lucide-react';

const AddUserForm = () => {
  return (
    <form className="space-y-4 mt-5">
      {/* Username Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <User className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="text" 
          placeholder="Username" 
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
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
      </div>

      {/* Password Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ShieldUser className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="password" 
          placeholder="Admin Password" 
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