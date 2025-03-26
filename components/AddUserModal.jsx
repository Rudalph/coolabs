"use client"
import React from 'react'
import { UserPlus } from 'lucide-react';
import AddUserFrom from "@/components/AddUserForm"

const AddUserModal = () => {
    return (
        <div className='flex justify-center items-center'>
            <button
                className="btn flex items-center gap-2 px-4 py-2 bg-black text-[white]"
                onClick={() => document.getElementById('my_modal_3').showModal()}
            >
                <UserPlus className="w-5 h-5" />
                <span>Add User</span>
            </button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Set Username & Password</h3>
                    <AddUserFrom />
                </div>
            </dialog>
        </div>
    )
}

export default AddUserModal