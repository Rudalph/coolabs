"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter, Bug, AlertTriangle, Calendar, User, RefreshCw, X, Clock, FileText, IdCard } from "lucide-react";

const BugTracker = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedBug, setSelectedBug] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fetch_bugs");
      const data = await response.json();
      if (response.ok) {
        setBugs(data);
      } else {
        setError(data.error || "Failed to fetch bugs");
      }
    } catch (error) {
      setError("Error fetching bugs");
    } finally {
      setLoading(false);
    }
  };

  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = 
      bug.bugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.bugId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.bugDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "unassigned") return matchesSearch && !bug.assignedTo;
    if (selectedFilter === "recent") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return matchesSearch && new Date(bug.dateAssigned) >= oneWeekAgo;
    }
    return matchesSearch;
  });

  const openBugModal = (bug) => {
    setSelectedBug(bug);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBug(null);
  };

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  return (
    <div className=" bg-white text-black">
      {/* Header */}
      <header className="border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold flex items-center">
            <Bug className="mr-3" />
            Bug Tracker
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
          {/* Search */}
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Search bugs by name, ID, description or assignee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <div className="relative">
              <select
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black pr-8"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Bugs</option>
                <option value="unassigned">Unassigned</option>
                <option value="recent">Recent (7 days)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Filter className="h-4 w-4" />
              </div>
            </div>
            
            <button 
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 flex items-center"
              onClick={fetchBugs}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Bug list */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex items-center">
              <RefreshCw className="mr-2 animate-spin" />
              Loading bugs...
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red-600">
            <AlertTriangle className="mr-2" />
            {error}
          </div>
        ) : filteredBugs.length === 0 ? (
          <div className="h-64 flex flex-col justify-center items-center text-gray-500">
            <Bug className="h-12 w-12 mb-4" />
            <p>{searchTerm ? "No bugs match your search" : "No bugs reported"}</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bug ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bug Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Reported</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBugs.map((bug) => (
                  <tr 
                    key={bug.id} 
                    className="group hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{bug.bugId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{bug.bugName}</td>
                    <td 
                      className="px-6 py-4 text-sm max-w-md truncate cursor-pointer hover:text-gray-700 hover:underline"
                      onClick={() => openBugModal(bug)}
                    >
                      {bug.bugDescription}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        {bug.assignedTo || "Unassigned"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        {new Date(bug.dateAssigned).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Bug Detail Modal */}
      {isModalOpen && selectedBug && (
        <div className="fixed inset-0 bg-transparent bg-opacity-10 backdrop-blur-[4px] flex items-center justify-center z-50 p-4">
          <div 
            className="absolute inset-0" 
            onClick={closeModal}
          ></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center">
                <Bug className="h-5 w-5 mr-2" />
                Bug Details
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-grow">
              <div className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-start">
                    <IdCard className="h-5 w-5 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-500">Bug ID</span>
                      <p className="text-lg font-semibold">{selectedBug.bugId}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-500">Bug Name</span>
                      <p className="text-lg font-semibold">{selectedBug.bugName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-500">Description</span>
                      <p className="whitespace-pre-wrap">{selectedBug.bugDescription}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-500">Assigned To</span>
                      <p className="font-semibold">{selectedBug.assignedTo || "Unassigned"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-500">Date Reported</span>
                      <p className="font-semibold">{new Date(selectedBug.dateAssigned).toLocaleDateString()} at {new Date(selectedBug.dateAssigned).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BugTracker;