"use client";
import React, { useState, useEffect } from "react";
import {
  Bug,
  AlertCircle,
  FileText,
  IdCard,
  Clock,
  Calendar,
  CircleUserRound
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AllBugs = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBugs = async () => {
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

    fetchBugs();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-gray-800 flex items-center"
      >
        <Clock className="mr-2 animate-spin" />
        Loading bugs...
      </motion.div>
    </div>
  );

  if (error) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center h-screen text-red-600"
    >
      Error: {error}
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center text-gray-900"
      >
        Bug Tracker
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {bugs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-gray-600"
            >
              No bugs reported.
            </motion.div>
          ) : (
            bugs.map((bug) => (
              <motion.div
                key={bug.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Bug className="h-6 w-6 mr-3 text-gray-700" />
                      {bug.bugName}
                    </h2>
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>

                  <div className="space-y-2">
                    <p className="flex items-center text-gray-700">
                      <IdCard className="h-5 w-5 mr-3 text-gray-600" />
                      <span className="font-medium">Bug ID:</span>
                      <span className="ml-2">{bug.bugId}</span>
                    </p>

                    <p className="flex items-start text-gray-700">
                      <FileText className="h-5 w-5 mr-3 mt-1 text-gray-600 flex-shrink-0" />
                      <span className="font-medium flex-shrink-0">Description:</span>
                      <span className="ml-2 break-words">{bug.bugDescription}</span>
                    </p>

                    <p className="flex items-center text-gray-700">
                      <CircleUserRound className="h-5 w-5 mr-3 text-gray-600" />
                      <span className="font-medium">Assigned to:</span>
                      <span className="ml-2 truncate max-w-[200px]">{bug.assignedTo}</span>
                    </p>

                    <p className="flex items-center text-gray-700">
                      <Calendar className="h-5 w-5 mr-3 text-gray-600" />
                      <span className="font-medium">Date Reported:</span>
                      <span className="ml-2">
                        {new Date(bug.dateAssigned).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllBugs;
