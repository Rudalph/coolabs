"use client"
import React from 'react'
import Link from 'next/link';

import { LayoutDashboard } from "lucide-react";

import Idcard from '@/components/Idcard'
import Logout from '@/components/Logout'


const page = () => {
 

    return (
        <div>
            <div className="relative min-h-screen bg-white flex flex-col items-center justify-center">
                <div className="absolute top-4 right-4 flex items-cente gap-2">
                   <Link href="/dashboard"> <button
                        className="btn flex items-center gap-2 px-4 py-2 bg-black text-[white]"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </button> </Link>
                    <Logout />
                </div>
                <Idcard />
            </div>
        </div>
    )
}

export default page