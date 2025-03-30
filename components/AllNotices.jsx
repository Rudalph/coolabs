"use client";
import React, { useState, useEffect } from "react";
import {
  BellRing,
  Clock,
  Calendar,
  UserCheck,
  X,
  ChevronDown,
  ChevronUp,
  Filter,
  Search
} from "lucide-react";
import { motion } from "framer-motion";

const AllNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedNoticeId, setExpandedNoticeId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  // Fetch notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/fetch_notices");
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setNotices(data);
        } else {
          setError(data.error || "Failed to fetch notices");
        }
      } catch (error) {
        setError("Error fetching notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Toggle expanded notice
  const toggleNotice = (id) => {
    setExpandedNoticeId(expandedNoticeId === id ? null : id);
  };

  // Filter notices
  const filteredNotices = notices.filter(notice => {
    // Search filter
    const matchesSearch = 
      notice.noticeTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.noticeDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.noticeAuthor.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Priority filter
    const matchesPriority = filterPriority === 'all' || notice.priority === filterPriority;
    
    return matchesSearch && matchesPriority;
  });

  // Sort notices
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    switch(sortOption) {
      case "newest":
        return new Date(b.publishDate) - new Date(a.publishDate);
      case "oldest":
        return new Date(a.publishDate) - new Date(b.publishDate);
      case "priority":
        const priorityOrder = { "urgent": 0, "high": 1, "normal": 2, "low": 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      default:
        return 0;
    }
  });

  // Priority badge color
  const getPriorityClass = (priority) => {
    switch(priority) {
      case "urgent": return "bg-black text-white";
      case "high": return "bg-gray-800 text-white";
      case "normal": return "bg-gray-600 text-white";
      case "low": return "bg-gray-400 text-black";
      default: return "bg-gray-500 text-white";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Check if notice is expired
  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date() > new Date(expiryDate);
  };

  // Loading state
  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse flex space-x-2">
        <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
        <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
        <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  );

  // Error state
  if (error) return (
    <div className="bg-gray-100 text-black p-4 rounded-lg text-center">
      <p className="font-semibold">Error: {error}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Notice Board</h1>
        
        {/* Filters and search */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          
          {/* Priority filter */}
          <div className="relative">
            <Filter className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none appearance-none"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          {/* Sort options */}
          <div className="relative">
            <Clock className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none appearance-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
        
        {/* Notices list */}
        {sortedNotices.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <BellRing className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No notices available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedNotices.map((notice) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`border rounded-lg overflow-hidden shadow-sm transition-all ${
                  isExpired(notice.expiryDate) ? 'opacity-60' : ''
                }`}
              >
                {/* Notice header */}
                <div 
                  onClick={() => toggleNotice(notice.id)}
                  className="flex items-center justify-between bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <BellRing className="h-5 w-5 text-gray-700" />
                    <h2 className="font-semibold text-lg">{notice.noticeTitle}</h2>
                    {isExpired(notice.expiryDate) && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                        Expired
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded uppercase ${getPriorityClass(notice.priority)}`}>
                      {notice.priority}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-3">
                      {formatDate(notice.publishDate)}
                    </span>
                    {expandedNoticeId === notice.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {/* Notice content (expandable) */}
                {expandedNoticeId === notice.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 py-3 bg-white border-t border-gray-200"
                  >
                    <div className="space-y-3">
                      <div className="text-gray-800 whitespace-pre-line">
                        {notice.noticeDescription}
                      </div>
                      
                      <div className="flex flex-wrap gap-y-2 pt-3 border-t border-gray-100 text-sm text-gray-500">
                        <div className="w-full sm:w-1/2 flex items-center">
                          <UserCheck className="h-4 w-4 mr-2" />
                          <span>By: {notice.noticeAuthor}</span>
                        </div>
                        <div className="w-full sm:w-1/2 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Published: {formatDate(notice.publishDate)}</span>
                        </div>
                        {notice.expiryDate && (
                          <div className="w-full sm:w-1/2 flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Expires: {formatDate(notice.expiryDate)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllNotices;