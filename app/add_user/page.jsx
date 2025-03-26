"use client"
import React from 'react'
import AddUserModal from "@/components/AddUserModal"
import AddTaskModal from "@/components/AddTaskModal"

const page = () => {
    return (
        <div className='flex justify-center items-center gap-6 w-full h-screen'>
            <AddUserModal />
            <AddTaskModal />
        </div>
    )
}

export default page