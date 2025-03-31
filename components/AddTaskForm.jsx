// "use client";
// import React, { useState } from "react";
// import { FileText, UserCheck, Calendar, AlignLeft, ShieldUser } from "lucide-react";

// const AddTaskForm = () => {
//   // State to store form data
//   const [taskData, setTaskData] = useState({
//     taskName: "",
//     taskLead: "",
//     taskDescription: "",
//     dateOfAssignment: "",
//     adminPassword: "",
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     setTaskData({ ...taskData, [e.target.name]: e.target.value });
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
    
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/add_task", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(taskData),
//       });

//       if (response.ok) {
//         alert("Task added successfully!");
//         setTaskData({
//           taskName: "",
//           taskLead: "",
//           taskDescription: "",
//           dateOfAssignment: "",
//           adminPassword: "",
//         });
//       } else {
//         alert("Error adding task");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 mt-5">
//       {/* Task Name Input */}
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <FileText className="h-5 w-5 text-gray-600" />
//         </div>
//         <input 
//           type="text" 
//           name="taskName"
//           value={taskData.taskName}
//           onChange={handleChange}
//           placeholder="Task Name" 
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
//         />
//       </div>

//       {/* Task Lead Input */}
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <UserCheck className="h-5 w-5 text-gray-600" />
//         </div>
//         <input 
//           type="text" 
//           name="taskLead"
//           value={taskData.taskLead}
//           onChange={handleChange}
//           placeholder="Task Lead" 
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
//         />
//       </div>

//       {/* Task Description Input */}
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
//           <AlignLeft className="h-5 w-5 text-gray-600" />
//         </div>
//         <textarea 
//           name="taskDescription"
//           value={taskData.taskDescription}
//           onChange={handleChange}
//           placeholder="Task Description" 
//           rows={3}
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
//         />
//       </div>

//       {/* Date of Assignment Input */}
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <Calendar className="h-5 w-5 text-gray-600" />
//         </div>
//         <input 
//           type="date" 
//           name="dateOfAssignment"
//           value={taskData.dateOfAssignment}
//           onChange={handleChange}
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
//         />
//       </div>

//       {/* Password Input */}
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <ShieldUser className="h-5 w-5 text-gray-600" />
//         </div>
//         <input 
//           type="password" 
//           name="adminPassword"
//           value={taskData.adminPassword}
//           onChange={handleChange}
//           placeholder="Admin Password" 
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
//         />
//       </div>

//       {/* Submit Button */}
//       <button 
//         type="submit" 
//         className="w-full flex items-center justify-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
//       >
//         <FileText className="mr-2 h-5 w-5" />
//         Create Task
//       </button>
//     </form>
//   );
// };

// export default AddTaskForm;



"use client";
import React, { useState } from "react";
import { 
  FileText, UserCheck, Calendar, AlignLeft, ShieldUser, 
  CheckCircle, Clock, XCircle, ChevronDown, Loader2 
} from "lucide-react";

const AddTaskForm = () => {
  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  
  // Task data state
  const [taskData, setTaskData] = useState({
    taskName: "",
    taskLead: "",
    taskDescription: "",
    dateOfAssignment: "",
    adminPassword: "",
    status: "Not Started" // Default status
  });

  // Status options with icons
  const statusOptions = [
    { value: "Not Started", label: "Not Started", icon: <XCircle className="h-4 w-4" /> },
    { value: "In Progress", label: "In Progress", icon: <Clock className="h-4 w-4" /> },
    { value: "Completed", label: "Completed", icon: <CheckCircle className="h-4 w-4" /> }
  ];

  // Get status icon based on value
  const getStatusIcon = (value) => {
    const option = statusOptions.find(opt => opt.value === value);
    return option ? option.icon : null;
  };

  // Handle input change
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
    // Clear messages when form is edited
    setSuccessMessage("");
    setErrorMessage("");
  };

  // Handle status selection
  const handleStatusSelect = (status) => {
    setTaskData({ ...taskData, status });
    setStatusDropdownOpen(false);
  };

  // Form validation
  const validateForm = () => {
    const requiredFields = ['taskName', 'taskLead', 'dateOfAssignment', 'adminPassword'];
    for (const field of requiredFields) {
      if (!taskData[field]) {
        setErrorMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/add_task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        setSuccessMessage("Task added successfully!");
        setTaskData({
          taskName: "",
          taskLead: "",
          taskDescription: "",
          dateOfAssignment: "",
          adminPassword: "",
          status: "Not Started"
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error adding task");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white">
      
      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-gray-100 border-l-4 border-black text-black">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            {successMessage}
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-gray-100 border-l-4 border-red-500 text-red-600">
          <div className="flex items-center">
            <XCircle className="h-5 w-5 mr-2" />
            {errorMessage}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Name Group */}
        <div className="space-y-1">
          {/* <label htmlFor="taskName" className="block text-left text-sm font-medium text-gray-700">
            Task Name
          </label> */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              id="taskName"
              type="text" 
              name="taskName"
              value={taskData.taskName}
              onChange={handleChange}
              placeholder="Enter task name" 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Task Lead Group */}
        <div className="space-y-2">
          {/* <label htmlFor="taskLead" className="block text-left text-sm font-medium text-gray-700">
            Task Lead
          </label> */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserCheck className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              id="taskLead"
              type="text" 
              name="taskLead"
              value={taskData.taskLead}
              onChange={handleChange}
              placeholder="Who is responsible for this task?" 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="space-y-2">
          {/* <label htmlFor="status" className="block text-left text-sm font-medium text-gray-700">
            Status
          </label> */}
          <div className="relative">
            <button
              type="button"
              className="w-full pl-3 pr-10 py-2 text-left border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
            >
              <div className="flex items-center">
                {getStatusIcon(taskData.status)}
                <span className="ml-2">{taskData.status}</span>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </button>
            
            {statusDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center"
                    onClick={() => handleStatusSelect(option.value)}
                  >
                    {option.icon}
                    <span className="ml-2">{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date of Assignment Group */}
        <div className="space-y-2">
          {/* <label htmlFor="dateOfAssignment" className="block text-left text-sm font-medium text-gray-700">
            Date of Assignment
          </label> */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              id="dateOfAssignment"
              type="date" 
              name="dateOfAssignment"
              value={taskData.dateOfAssignment}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Task Description Group */}
        <div className="space-y-2">
          {/* <label htmlFor="taskDescription" className="block text-left text-sm font-medium text-gray-700">
            Task Description
          </label> */}
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <AlignLeft className="h-5 w-5 text-gray-400" />
            </div>
            <textarea 
              id="taskDescription"
              name="taskDescription"
              value={taskData.taskDescription}
              onChange={handleChange}
              placeholder="Describe the task in detail" 
              rows={4}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Admin Password Group */}
        <div className="space-y-2">
          {/* <label htmlFor="adminPassword" className="block text-left text-sm font-medium text-gray-700">
            Admin Password
          </label> */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ShieldUser className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              id="adminPassword"
              type="password" 
              name="adminPassword"
              value={taskData.adminPassword}
              onChange={handleChange}
              placeholder="Enter admin password" 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Submitting...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-5 w-5" />
              Create Task
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;