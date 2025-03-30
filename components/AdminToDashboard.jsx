import React from 'react'
import { LayoutDashboard } from "lucide-react";
import Link from 'next/link';

const AdminToDashboard = () => {
  return (
    <div>
       <Link href="/dashboard"> <button
                className="btn flex items-center gap-2 px-4 py-2 bg-black text-[white]"
            >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
            </button> </Link>
    </div>
  )
}

export default AdminToDashboard