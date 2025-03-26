"use client"
import React from 'react';
import { FileText, UserCheck, Calendar, AlignLeft, ShieldUser } from 'lucide-react';

const AddTaskForm = () => {
  return (
    <form className="space-y-4 mt-5">
      {/* Task Name Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FileText className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="text" 
          placeholder="Task Name" 
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
      </div>

      {/* Task Lead Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <UserCheck className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="text" 
          placeholder="Task Lead" 
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
      </div>

      {/* Task Description Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
          <AlignLeft className="h-5 w-5 text-gray-600" />
        </div>
        <textarea 
          placeholder="Task Description" 
          rows={3}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
      </div>

      {/* Date of Assignment Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="date" 
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
        <FileText className="mr-2 h-5 w-5" />
        Create Task
      </button>
    </form>
  );
};

export default AddTaskForm;