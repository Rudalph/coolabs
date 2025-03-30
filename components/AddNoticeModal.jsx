"use client"
import React from 'react'
import { NotebookPen } from 'lucide-react';
import AddNoticeForm from "@/components/AddNoticeForm"

const AddTaskModal = () => {
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
                className="btn flex items-center gap-2 px-4 py-2 bg-black text-[white]"
                onClick={() => document.getElementById('add_notice_modal').showModal()}
            >
                <NotebookPen className="w-5 h-5" />
                <span>Add Notice</span>
            </button>
            <dialog id="add_notice_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add Notice</h3>
                    <AddNoticeForm />
                </div>
            </dialog>
        </div>
    )
}

export default AddTaskModal