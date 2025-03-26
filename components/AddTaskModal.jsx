"use client"
import React from 'react'
import { SquarePen } from 'lucide-react';
import AddTaskForm from "@/components/AddTaskForm"

const AddTaskModal = () => {
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
                className="btn flex items-center gap-2 px-4 py-2 bg-black text-[white]"
                onClick={() => document.getElementById('my_modal_4').showModal()}
            >
                <SquarePen className="w-5 h-5" />
                <span>Add Task</span>
            </button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add New Task</h3>
                    <AddTaskForm />
                </div>
            </dialog>
        </div>
    )
}

export default AddTaskModal