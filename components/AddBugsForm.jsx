"use client";

import React, { useState } from "react";
import { Bug, Hash, FileText, UserCheck, Calendar } from "lucide-react";

const AddNewBugForm = () => {
  // State for form data
  const [bugData, setBugData] = useState({
    bugName: "",
    bugId: "",
    bugDescription: "",
    assignedTo: "",
    dateAssigned: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setBugData({ ...bugData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/add_bug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bugData),
      });

      if (response.ok) {
        alert("Bug added successfully!");
        setBugData({
          bugName: "",
          bugId: "",
          bugDescription: "",
          assignedTo: "",
          dateAssigned: "",
        });
      } else {
        alert("Error adding bug");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-5 rounded-lg max-w-md mx-auto">

      {/* Bug Name */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Bug className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="text" 
          name="bugName"
          value={bugData.bugName}
          onChange={handleChange}
          placeholder="Bug Name" 
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300" 
        />
      </div>

      {/* Bug ID */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Hash className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="text" 
          name="bugId"
          value={bugData.bugId}
          onChange={handleChange}
          placeholder="Bug ID" 
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300" 
        />
      </div>

      {/* Bug Description */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 pt-2 pointer-events-none">
          <FileText className="h-5 w-5 text-gray-600" />
        </div>
        <textarea 
          name="bugDescription"
          value={bugData.bugDescription}
          onChange={handleChange}
          placeholder="Bug Description" 
          rows={3}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300" 
        />
      </div>

      {/* Assigned To */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <UserCheck className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="text" 
          name="assignedTo"
          value={bugData.assignedTo}
          onChange={handleChange}
          placeholder="Assigned To" 
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300" 
        />
      </div>

      {/* Date Assigned */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="date" 
          name="dateAssigned"
          value={bugData.dateAssigned}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300" 
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full flex items-center justify-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        <Bug className="mr-2 h-5 w-5" />
        Submit Bug
      </button>
    </form>
  );
};

export default AddNewBugForm;
