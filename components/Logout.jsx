"use client"
import React,{useEffect} from 'react'
import { LucideLogOut } from 'lucide-react'
import { signOut } from "firebase/auth";
import { auth } from "../database/firebase"

const Logout = () => {

  
  const logout = () => {
   
        signOut(auth).then(() => {
           alert("Logged Out")
        }).catch((error) => {
           alert(error)
        });
  }

  return (
    <div>
        <button
                className="btn flex items-center gap-2 px-4 py-2 bg-black text-[white]"
                onClick={() => logout()}
            >
                <LucideLogOut className="w-5 h-5" />
                <span>Logout</span>
            </button>
    </div>
  )
}

export default Logout