"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

import AddUserModal from "@/components/AddUserModal";
import AddTaskModal from "@/components/AddTaskModal";
import Logout from "@/components/Logout";
import AdminToDashboard from "@/components/AdminToDashboard";
import AddBugsModal from "@/components/AddBugsModal";
import AddNoticeModal from "@/components/AddNoticeModal";

const Page = () => {

    const auth = useAuth();
    console.log("Auth Context:", auth);

    const { user, loading } = auth;
    const router = useRouter();

    // Check if the logged-in user is an admin
    const isAdmin = user?.email === "rudalph.gonsalves@zenithzest.tech";

    useEffect(() => {
        if (!loading && !isAdmin) {
            router.replace("/user_idcard");
        }
    }, [loading, isAdmin, router]);

    if (loading) return <p>Loading...</p>;

    // Prevent non-admin users from viewing the dashboard
    if (!isAdmin) {
        return null;
    }

    // Extract first name and last name from email
    const userName = user.email
        .split("@")[0]
        .split(".")
        .map(name => name.charAt(0).toUpperCase() + name.slice(1))
        .join(" ");

    return (
        <>
            <div className="bg-white min-h-screen">

                {/* Simple Header */}
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    <Logout />
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto py-8 px-4">

                    {/* Action Bar */}
                    <div className="mb-8 flex items-center justify-between">
                        <AdminToDashboard />
                        <div className="flex gap-4">
                            {/* <AddUserModal />
                            <AddTaskModal /> */}
                        </div>
                    </div>

                    {/* Simple Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">

                        <div className="bg-white p-4 rounded-md border border-gray-200">
                            <p className="text-sm text-gray-500">Total Users</p>
                            <p className="text-2xl font-bold">2,845</p>
                        </div>

                        <div className="bg-white p-4 rounded-md border border-gray-200">
                            <p className="text-sm text-gray-500">Tasks</p>
                            <p className="text-2xl font-bold">126</p>
                        </div>

                        <div className="bg-white p-4 rounded-md border border-gray-200">
                            <p className="text-sm text-gray-500">Completed</p>
                            <p className="text-2xl font-bold">842</p>
                        </div>

                        <div className="bg-white p-4 rounded-md border border-gray-200">
                            <p className="text-sm text-gray-500">Sessions</p>
                            <p className="text-2xl font-bold">74</p>
                        </div>

                    </div>

                    {/* Welcome Card */}
                    <div className="bg-gray-50 p-6 rounded-md mb-8 text-center">
                        <h2 className="text-xl font-bold mb-2">
                            Welcome back, {userName}
                        </h2>

                        <p className="text-gray-600 mb-4">
                            Here's a quick overview of your dashboard
                        </p>

                        <div className="flex justify-center gap-4">
                            <AddUserModal />
                            <AddTaskModal />
                        </div>
                    </div>

                    {/* Button Group */}
                    <div className="p-6 rounded-md border border-gray-200 lg:mt-20">
                        <h2 className="text-lg font-bold mb-4">
                            Quick Actions
                        </h2>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <AddNoticeModal />
                            <AddBugsModal />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Page;
