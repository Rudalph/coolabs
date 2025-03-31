// "use client";
// import React, { useState, useEffect } from "react";
// import { 
//   Calendar, 
//   NotepadText, 
//   FileText, 
//   UserCheck,
//   CheckCircle2,
//   Clock
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const AllTasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch("/api/fetch_task");
//         const data = await response.json();
//         if (response.ok) {
//           setTasks(data);
//         } else {
//           setError(data.error || "Failed to fetch tasks");
//         }
//       } catch (error) {
//         setError("Error fetching tasks");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   if (loading) return (
//     <div className="flex justify-center items-center h-screen">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1 }}
//         className="text-gray-800 flex items-center"
//       >
//         <Clock className="mr-2 animate-spin" />
//         Loading tasks...
//       </motion.div>
//     </div>
//   );

//   if (error) return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="flex justify-center items-center h-screen text-red-600"
//     >
//       Error: {error}
//     </motion.div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <motion.h1 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-bold mb-8 text-center text-gray-900"
//       >
//         Task Dashboard
//       </motion.h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <AnimatePresence>
//           {tasks.length === 0 ? (
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="col-span-full text-center text-gray-600"
//             >
//               No tasks available.
//             </motion.div>
//           ) : (
//             tasks.map((task) => (
//               <motion.div
//                 key={task.id}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.3 }}
//                 whileHover={{ scale: 1.03 }}
//                 className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300"
//               >
//                 <div className="p-6 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <h2 className="text-xl font-semibold text-gray-900 flex items-center">
//                       <FileText className="h-6 w-6 mr-3 text-gray-700" />
//                       {task.taskName}
//                     </h2>
//                     <CheckCircle2 className="h-5 w-5 text-green-600" />
//                   </div>

//                   <div className="space-y-2">
//                     <p className="flex items-center text-gray-700">
//                       <UserCheck className="h-5 w-5 mr-3 text-gray-600" />
//                       <span className="font-medium">Assigned to:</span> 
//                       <span className="ml-2">{task.taskLead}</span>
//                     </p>

//                     <p className="flex items-center text-gray-700">
//                       <NotepadText className="h-5 w-5 mr-3 text-gray-600" />
//                       <span className="font-medium">Description:</span>
//                       <span className="ml-2 truncate max-w-[200px]">{task.taskDescription}</span>
//                     </p>

//                     <p className="flex items-center text-gray-700">
//                       <Calendar className="h-5 w-5 mr-3 text-gray-600" />
//                       <span className="font-medium">Due Date:</span>
//                       <span className="ml-2">
//                         {new Date(task.dateOfAssignment).toLocaleDateString()}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default AllTasks;


// "use client";
// import React, { useState, useEffect } from "react";
// import { 
//   Calendar, 
//   FileText, 
//   UserCheck,
//   ClipboardList,
//   Plus,
//   X,
//   Loader2,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   CheckCheck,
//   NotepadText
// } from "lucide-react";

// const TaskManager = () => {
//   // State for tasks and UI
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [updatingTaskId, setUpdatingTaskId] = useState(null);

//   // Form state
//   const [newTask, setNewTask] = useState({
//     taskName: "",
//     taskLead: "",
//     taskDescription: "",
//     dateOfAssignment: "",
//     adminPassword: "",
//     status: "Not Started"
//   });

//   // Fetch tasks
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("/api/fetch_task");
//         const data = await response.json();
        
//         if (response.ok) {
//           setTasks(data);
//         } else {
//           setError(data.error || "Failed to fetch tasks");
//         }
//       } catch (error) {
//         setError("Error fetching tasks");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTask(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitStatus("loading");

//     try {
//       const response = await fetch("/api/add_task", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newTask),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // Add the new task to the tasks array
//         setTasks(prev => [...prev, {...newTask, id: result.id}]);
//         // Reset form
//         setNewTask({
//           taskName: "",
//           taskLead: "",
//           taskDescription: "",
//           dateOfAssignment: "",
//           adminPassword: "",
//           status: "Not Started"
//         });
//         setSubmitStatus("success");
//         // Close the form after a delay
//         setTimeout(() => {
//           setShowAddForm(false);
//           setSubmitStatus(null);
//         }, 2000);
//       } else {
//         setSubmitStatus("error");
//         setError(result.error || "Failed to add task");
//       }
//     } catch (error) {
//       setSubmitStatus("error");
//       setError("Error adding task");
//     }
//   };

//   // Handle status update
//   const updateTaskStatus = async (taskId, newStatus) => {
//     setUpdatingTaskId(taskId);
    
//     try {
//       const response = await fetch("/api/update_task_status", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           taskId,
//           status: newStatus
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // Update the task in the local state
//         setTasks(prev => 
//           prev.map(task => 
//             task.id === taskId ? { ...task, status: newStatus } : task
//           )
//         );
//       } else {
//         setError(result.error || "Failed to update task status");
//       }
//     } catch (error) {
//       setError("Error updating task status");
//     } finally {
//       setUpdatingTaskId(null);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-white">
//         <div className="text-black flex items-center">
//           <Loader2 className="mr-2 animate-spin" />
//           Loading tasks...
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && !showAddForm) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-white text-black">
//         <AlertCircle className="mr-2" />
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white text-black min-h-screen">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-black">Task Manager</h1>
//           <button
//             onClick={() => setShowAddForm(!showAddForm)}
//             className="bg-black text-white px-4 py-2 rounded-md flex items-center hover:bg-gray-800 transition-colors"
//           >
//             {showAddForm ? (
//               <>
//                 <X className="mr-2" size={18} />
//                 Cancel
//               </>
//             ) : (
//               <>
//                 <Plus className="mr-2" size={18} />
//                 Add Task
//               </>
//             )}
//           </button>
//         </div>

//         {/* Add Task Form */}
//         {showAddForm && (
//           <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
//             <h2 className="text-xl font-semibold mb-4 flex items-center">
//               <ClipboardList className="mr-2" />
//               Add New Task
//             </h2>
            
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Task Name</label>
//                   <input
//                     type="text"
//                     name="taskName"
//                     value={newTask.taskName}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Task Lead</label>
//                   <input
//                     type="text"
//                     name="taskLead"
//                     value={newTask.taskLead}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1">Description</label>
//                 <textarea
//                   name="taskDescription"
//                   value={newTask.taskDescription}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                   rows="3"
//                   required
//                 />
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Due Date</label>
//                   <input
//                     type="date"
//                     name="dateOfAssignment"
//                     value={newTask.dateOfAssignment}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Admin Password</label>
//                   <input
//                     type="password"
//                     name="adminPassword"
//                     value={newTask.adminPassword}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center"
//                   disabled={submitStatus === "loading"}
//                 >
//                   {submitStatus === "loading" ? (
//                     <>
//                       <Loader2 className="mr-2 animate-spin" size={18} />
//                       Submitting...
//                     </>
//                   ) : submitStatus === "success" ? (
//                     <>
//                       <CheckCircle className="mr-2" size={18} />
//                       Task Added!
//                     </>
//                   ) : (
//                     "Add Task"
//                   )}
//                 </button>
//               </div>
              
//               {submitStatus === "error" && (
//                 <div className="text-red-600 flex items-center">
//                   <AlertCircle className="mr-2" size={18} />
//                   {error || "Failed to add task. Please try again."}
//                 </div>
//               )}
//             </form>
//           </div>
//         )}

//         {/* Task List */}
//         <div className="p-6 flex flex-col h-full space-y-4">
//           {tasks.length === 0 ? (
//             <div className="col-span-full text-center text-gray-600 p-8 bg-gray-50 rounded-lg border border-gray-200">
//               No tasks available. Add your first task to get started.
//             </div>
//           ) : (
//             tasks.map((task) => (
//               <div
//                 key={task.id}
//                 className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
//               >
//                 <div className="p-6 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <h2 className="text-xl font-semibold text-black flex items-center">
//                       <FileText className="h-5 w-5 mr-2 text-gray-700" />
//                       {task.taskName}
//                     </h2>
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       task.status === "Completed" ? "bg-green-100 text-green-800" :
//                       task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
//                       "bg-gray-100 text-gray-800"
//                     }`}>
//                       {task.status}
//                     </span>
//                   </div>

//                   <div className="space-y-2">
//                     <p className="flex items-center text-gray-700">
//                       <UserCheck className="h-4 w-4 mr-2 text-gray-600" />
//                       <span className="font-medium">Lead:</span> 
//                       <span className="ml-2">{task.taskLead}</span>
//                     </p>

//                     {/* <p className="flex items-center text-gray-700">
//                       <NotepadText className="h-4 w-4 mr-2 text-gray-600" />
//                       <span className="font-medium">Description:</span> 
//                       <span className="ml-2">{task.taskDescription}</span>
//                     </p> */}

// <div className="text-gray-700">
//   <div className="flex items-start mb-1">
//     <NotepadText className="h-4 w-4 mr-2 text-gray-600 mt-1 flex-shrink-0" />
//     <span className="font-medium">Description:</span>
//     <p className="ml-6 break-words">{task.taskDescription}</p>
//   </div>
// </div>

//                     <p className="flex items-center text-gray-700">
//                       <Calendar className="h-4 w-4 mr-2 text-gray-600" />
//                       <span className="font-medium">Due:</span>
//                       <span className="ml-2">
//                         {new Date(task.dateOfAssignment).toLocaleDateString()}
//                       </span>
//                     </p>
//                   </div>
                  
//                   {/* Status Update Buttons */}
//                   <div className="pt-4 border-t border-gray-100 flex justify-between mt-auto">
//                     {task.status !== "In Progress" && (
//                       <button
//                         onClick={() => updateTaskStatus(task.id, "In Progress")}
//                         disabled={updatingTaskId === task.id}
//                         className="bg-gray-100 hover:bg-gray-200 text-black px-3 py-1 rounded flex items-center text-sm transition-colors"
//                       >
//                         {updatingTaskId === task.id ? (
//                           <Loader2 className="mr-1 animate-spin" size={14} />
//                         ) : (
//                           <Clock className="mr-1" size={14} />
//                         )}
//                         Set In Progress
//                       </button>
//                     )}
                    
//                     {task.status !== "Completed" && (
//                       <button
//                         onClick={() => updateTaskStatus(task.id, "Completed")}
//                         disabled={updatingTaskId === task.id}
//                         className="bg-gray-100 hover:bg-gray-200 text-black px-3 py-1 rounded flex items-center text-sm transition-colors ml-auto"
//                       >
//                         {updatingTaskId === task.id ? (
//                           <Loader2 className="mr-1 animate-spin" size={14} />
//                         ) : (
//                           <CheckCheck className="mr-1" size={14} />
//                         )}
//                         Mark Complete
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskManager;



"use client";
import React, { useState, useEffect, useMemo } from "react";
import { 
  Calendar, 
  FileText, 
  UserCheck,
  ClipboardList,
  Plus,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
  CheckCheck,
  NotepadText,
  Search,
  Filter,
  ChevronDown,
  LayoutDashboard,
  Trash2
} from "lucide-react";

const TaskManager = () => {
  // State for tasks and UI
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dateOfAssignment");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Form state
  const [newTask, setNewTask] = useState({
    taskName: "",
    taskLead: "",
    taskDescription: "",
    dateOfAssignment: "",
    adminPassword: "",
    status: "Not Started"
  });

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/fetch_task");
        const data = await response.json();
        
        if (response.ok) {
          setTasks(data);
        } else {
          setError(data.error || "Failed to fetch tasks");
        }
      } catch (error) {
        setError("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("loading");

    try {
      const response = await fetch("/api/add_task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const result = await response.json();

      if (response.ok) {
        // Add the new task to the tasks array
        setTasks(prev => [...prev, {...newTask, id: result.id}]);
        // Reset form
        setNewTask({
          taskName: "",
          taskLead: "",
          taskDescription: "",
          dateOfAssignment: "",
          adminPassword: "",
          status: "Not Started"
        });
        setSubmitStatus("success");
        // Close the form after a delay
        setTimeout(() => {
          setShowAddForm(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus("error");
        setError(result.error || "Failed to add task");
      }
    } catch (error) {
      setSubmitStatus("error");
      setError("Error adding task");
    }
  };

  // Handle status update
  const updateTaskStatus = async (taskId, newStatus) => {
    setUpdatingTaskId(taskId);
    
    try {
      const response = await fetch("/api/update_task_status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId,
          status: newStatus
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Update the task in the local state
        setTasks(prev => 
          prev.map(task => 
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      } else {
        setError(result.error || "Failed to update task status");
      }
    } catch (error) {
      setError("Error updating task status");
    } finally {
      setUpdatingTaskId(null);
    }
  };

  // Handle delete task 
  const deleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setUpdatingTaskId(taskId);
      
      try {
        const response = await fetch("/api/delete_task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskId
          }),
        });

        const result = await response.json();

        if (response.ok) {
          // Remove the task from the local state
          setTasks(prev => prev.filter(task => task.id !== taskId));
        } else {
          setError(result.error || "Failed to delete task");
        }
      } catch (error) {
        setError("Error deleting task");
      } finally {
        setUpdatingTaskId(null);
      }
    }
  };

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    // First filter by search query and status
    let filtered = tasks.filter(task => {
      const matchesSearch = 
        task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.taskLead.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.taskDescription.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    // Then sort
    return filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === "taskName") {
        comparison = a.taskName.localeCompare(b.taskName);
      } else if (sortBy === "taskLead") {
        comparison = a.taskLead.localeCompare(b.taskLead);
      } else if (sortBy === "dateOfAssignment") {
        comparison = new Date(a.dateOfAssignment) - new Date(b.dateOfAssignment);
      } else if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status);
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [tasks, searchQuery, statusFilter, sortBy, sortDirection]);

  // Toggle sort direction
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(prevDirection => prevDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-black flex items-center bg-white p-4 rounded-lg shadow">
          <Loader2 className="mr-2 animate-spin" />
          Loading tasks...
        </div>
      </div>
    );
  }

  // Error state
  if (error && !showAddForm) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-black flex items-center bg-white p-4 rounded-lg shadow">
          <AlertCircle className="mr-2 text-red-500" />
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-black  pb-8">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-black flex items-center">
              <LayoutDashboard className="mr-2" />
              Task Manager
            </h1>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-black text-white px-4 py-2 rounded-md flex items-center hover:bg-gray-800 transition-colors mt-4 md:mt-0"
            >
              {showAddForm ? (
                <>
                  <X className="mr-2" size={18} />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="mr-2" size={18} />
                  Add Task
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Add Task Form */}
        {showAddForm && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ClipboardList className="mr-2" />
              Add New Task
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Task Name</label>
                  <input
                    type="text"
                    name="taskName"
                    value={newTask.taskName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Task Lead</label>
                  <input
                    type="text"
                    name="taskLead"
                    value={newTask.taskLead}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="taskDescription"
                  value={newTask.taskDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  rows="3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <input
                    type="date"
                    name="dateOfAssignment"
                    value={newTask.dateOfAssignment}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Admin Password</label>
                  <input
                    type="password"
                    name="adminPassword"
                    value={newTask.adminPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center"
                  disabled={submitStatus === "loading"}
                >
                  {submitStatus === "loading" ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={18} />
                      Submitting...
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <CheckCircle className="mr-2" size={18} />
                      Task Added!
                    </>
                  ) : (
                    "Add Task"
                  )}
                </button>
              </div>
              
              {submitStatus === "error" && (
                <div className="text-red-600 flex items-center">
                  <AlertCircle className="mr-2" size={18} />
                  {error || "Failed to add task. Please try again."}
                </div>
              )}
            </form>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            
            {/* Filter and Sort Options */}
            <div className="flex flex-wrap gap-2 items-center">
              {/* View toggle buttons */}
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button 
                  className={`flex items-center px-3 py-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutDashboard size={16} className="mr-1" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button 
                  className={`flex items-center px-3 py-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => setViewMode('list')}
                >
                  <ClipboardList size={16} className="mr-1" />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>
              
              {/* Filter button */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white"
                >
                  <Filter size={16} className="mr-1" />
                  <span className="hidden sm:inline">Filter</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
                
                {showFilterMenu && (
                  <div className="absolute mt-1 right-0 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="p-3">
                      <h3 className="font-medium text-sm mb-2">Status</h3>
                      <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        <option value="All">All</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      
                      <h3 className="font-medium text-sm mt-3 mb-2">Sort By</h3>
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        <option value="dateOfAssignment">Due Date</option>
                        <option value="taskName">Task Name</option>
                        <option value="taskLead">Task Lead</option>
                        <option value="status">Status</option>
                      </select>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <button 
                          className={`flex-1 px-3 py-1 rounded-md border ${sortDirection === 'asc' ? 'bg-gray-100 border-gray-400' : 'border-gray-300'}`}
                          onClick={() => setSortDirection('asc')}
                        >
                          Asc
                        </button>
                        <button 
                          className={`flex-1 px-3 py-1 rounded-md border ${sortDirection === 'desc' ? 'bg-gray-100 border-gray-400' : 'border-gray-300'}`}
                          onClick={() => setSortDirection('desc')}
                        >
                          Des
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className={`space-y-4 ${viewMode === 'grid' ? 'lg:p-6 flex flex-col h-full space-y-4' : ''}`}>
          {filteredAndSortedTasks.length === 0 ? (
            <div className="col-span-full text-center text-gray-600 p-8 bg-white rounded-lg shadow-sm border border-gray-200">
              {searchQuery || statusFilter !== "All" ? 
                "No tasks match your search criteria." : 
                "No tasks available. Add your first task to get started."}
            </div>
          ) : (
            viewMode === 'grid' ? (
              // Grid View
              filteredAndSortedTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-black flex items-center break-words line-clamp-1">
                        <FileText className="h-5 w-5 mr-2 text-gray-700 flex-shrink-0" />
                        {task.taskName}
                      </h2>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.status === "Completed" ? "bg-green-100 text-green-800" :
                        task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {task.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="flex items-center text-gray-700">
                        <UserCheck className="h-4 w-4 mr-2 text-gray-600 flex-shrink-0" />
                        <span className="font-medium">Lead:</span> 
                        <span className="ml-2 truncate">{task.taskLead}</span>
                      </p>

                      <div className="text-gray-700">
                        <div className="flex items-start">
                          <NotepadText className="h-4 w-4 mr-2 text-gray-600 mt-1 flex-shrink-0" />
                        
                            <span className="font-medium">Description:</span>
                            <span className="ml-2 break-words line-clamp-2">{task.taskDescription}</span>
                          
                        </div>
                      </div>

                      <p className="flex items-center text-gray-700">
                        <Calendar className="h-4 w-4 mr-2 text-gray-600 flex-shrink-0" />
                        <span className="font-medium">Due:</span>
                        <span className="ml-2">
                          {new Date(task.dateOfAssignment).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                    
                    {/* Status Update Buttons */}
                    <div className="pt-3 border-t border-gray-100 flex justify-between mt-auto">
                      {task.status !== "In Progress" && (
                        <button
                          onClick={() => updateTaskStatus(task.id, "In Progress")}
                          disabled={updatingTaskId === task.id}
                          className="bg-gray-100 hover:bg-gray-200 text-black px-1 py-1 rounded flex items-center text-sm transition-colors"
                        >
                          {updatingTaskId === task.id ? (
                            <Loader2 className="mr-1 animate-spin" size={14} />
                          ) : (
                            <Clock className="mr-1" size={14} />
                          )}
                          In Progress
                        </button>
                      )}
                      
                      {task.status !== "Completed" && (
                        <button
                          onClick={() => updateTaskStatus(task.id, "Completed")}
                          disabled={updatingTaskId === task.id}
                          className="bg-gray-100 hover:bg-gray-200 text-black px-1 py-1 rounded flex items-center text-sm transition-colors ml-auto"
                        >
                          {updatingTaskId === task.id ? (
                            <Loader2 className="mr-1 animate-spin" size={14} />
                          ) : (
                            <CheckCheck className="mr-1" size={14} />
                          )}
                          Complete
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteTask(task.id)}
                        disabled={updatingTaskId === task.id}
                        className="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded flex items-center text-sm transition-colors ml-2"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // List View
              <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("taskName")}>
                          <div className="flex items-center">
                            Task
                            {sortBy === "taskName" && (
                              <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
                            )}
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("taskLead")}>
                          <div className="flex items-center">
                            Lead
                            {sortBy === "taskLead" && (
                              <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
                            )}
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("dateOfAssignment")}>
                          <div className="flex items-center">
                            Due Date
                            {sortBy === "dateOfAssignment" && (
                              <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
                            )}
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("status")}>
                          <div className="flex items-center">
                            Status
                            {sortBy === "status" && (
                              <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
                            )}
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAndSortedTasks.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{task.taskName}</div>
                                <div className="text-sm text-gray-500 line-clamp-1">{task.taskDescription}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{task.taskLead}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{new Date(task.dateOfAssignment).toLocaleDateString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              task.status === "Completed" ? "bg-green-100 text-green-800" :
                              task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              {task.status !== "In Progress" && (
                                <button
                                  onClick={() => updateTaskStatus(task.id, "In Progress")}
                                  disabled={updatingTaskId === task.id}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  {updatingTaskId === task.id ? (
                                    <Loader2 className="animate-spin" size={16} />
                                  ) : (
                                    <Clock size={16} />
                                  )}
                                </button>
                              )}
                              
                              {task.status !== "Completed" && (
                                <button
                                  onClick={() => updateTaskStatus(task.id, "Completed")}
                                  disabled={updatingTaskId === task.id}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  {updatingTaskId === task.id ? (
                                    <Loader2 className="animate-spin" size={16} />
                                  ) : (
                                    <CheckCheck size={16} />
                                  )}
                                </button>
                              )}
                              
                              <button
                                onClick={() => deleteTask(task.id)}
                                disabled={updatingTaskId === task.id}
                                className="text-red-600 hover:text-red-900"
                              >
                                {updatingTaskId === task.id ? (
                                  <Loader2 className="animate-spin" size={16} />
                                ) : (
                                  <Trash2 size={16} />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;