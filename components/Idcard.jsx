"use client"
import React, { useEffect } from 'react'
import { User, Mail, Building2, MapPin } from 'lucide-react'
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation";

const Idcard = () => {
    const auth = useAuth();
    const { user, loading } = auth;
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black border-opacity-50 mx-auto mb-4"></div>
                    <p className="text-gray-800">Loading your ID card...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-4">
            <div className="w-96 bg-white rounded-2xl shadow-2xl border border-black border-opacity-10 overflow-hidden">
                {/* Header */}
                <div className="bg-black text-white text-center py-4">
                    <h2 className="text-2xl font-bold">Creative TechScapes</h2>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center p-6">
                    <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center shadow-md">
                        <User className="w-16 h-16 text-black text-opacity-60" />
                    </div>
                    
                    <div className="text-center">
                        <p className="text-xl font-bold text-black mb-1">
                            {user.displayName || 'Employee'}
                        </p>
                        <p className="text-sm text-gray-700 mb-4">{user.email}</p>
                    </div>

                    {/* Details Section */}
                    <div className="w-full space-y-3">
                        <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-black text-opacity-60" />
                            <p className="text-sm text-black">{user.email}</p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <Building2 className="w-5 h-5 text-black text-opacity-60" />
                            <p className="text-sm text-black">
                                <span className="font-semibold">Designation:</span> Intern
                            </p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <Building2 className="w-5 h-5 text-black text-opacity-60" />
                            <p className="text-sm text-black">
                                <span className="font-semibold">Department:</span> Engineering
                            </p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-black text-opacity-60" />
                            <p className="text-sm text-black">Mumbai, Maharashtra</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-100 text-center py-2">
                    <p className="text-xs text-gray-800">Employee ID: {user.uid || 'CTSP-2024'}</p>
                </div>
            </div>
        </div>
    )
}

export default Idcard