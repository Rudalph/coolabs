"use client";
import React, { useState } from "react";
import { BellRing, UserCheck, Calendar, AlignLeft, ShieldUser, Clock } from "lucide-react";

const AddNoticeForm = () => {
  // State to store form data
  const [noticeData, setNoticeData] = useState({
    noticeTitle: "",
    noticeAuthor: "",
    noticeDescription: "",
    publishDate: "",
    expiryDate: "",
    priority: "normal",
    adminPassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setNoticeData({ ...noticeData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/add_notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noticeData),
      });

      if (response.ok) {
        alert("Notice published successfully!");
        setNoticeData({
          noticeTitle: "",
          noticeAuthor: "",
          noticeDescription: "",
          publishDate: "",
          expiryDate: "",
          priority: "normal",
          adminPassword: "",
        });
      } else {
        alert("Error publishing notice");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-5">
      {/* Notice Title Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BellRing className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="text" 
          name="noticeTitle"
          value={noticeData.noticeTitle}
          onChange={handleChange}
          placeholder="Notice Title" 
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
      </div>

      {/* Notice Author Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <UserCheck className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="text" 
          name="noticeAuthor"
          value={noticeData.noticeAuthor}
          onChange={handleChange}
          placeholder="Notice Author" 
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
      </div>

      {/* Notice Description Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
          <AlignLeft className="h-5 w-5 text-gray-600" />
        </div>
        <textarea 
          name="noticeDescription"
          value={noticeData.noticeDescription}
          onChange={handleChange}
          placeholder="Notice Description" 
          rows={4}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
      {/* Publish Date Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="date" 
          name="publishDate"
          value={noticeData.publishDate}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
      </div>

       {/* Expiry Date Input */}
       <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
       <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="date" 
          name="expiryDate"
          value={noticeData.expiryDate}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
      </div>


      {/* Priority Selection */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
        <select
          name="priority"
          value={noticeData.priority}
          onChange={handleChange}
          className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      {/* Password Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ShieldUser className="h-5 w-5 text-gray-600" />
        </div>
        <input 
          type="password" 
          name="adminPassword"
          value={noticeData.adminPassword}
          onChange={handleChange}
          placeholder="Admin Password" 
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full flex items-center justify-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
      >
        <BellRing className="mr-2 h-5 w-5" />
        Publish Notice
      </button>
    </form>
  );
};

export default AddNoticeForm;