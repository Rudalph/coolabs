"use client"

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

import React,{useEffect} from 'react'

import AddUserModal from "@/components/AddUserModal"
import AddTaskModal from "@/components/AddTaskModal"
import Logout from "@/components/Logout"
import Idcard from "../../components/Idcard";

const page = () => {

  const auth = useAuth(); 
  console.log("Auth Context:", auth); 
  const { user, loading } = auth;
  const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
          router.push("/"); 
        }
      }, [user, loading, router]);
    
    if (loading) return <p>Loading...</p>;
    return (
      <>
      <div className='flex justify-center items-center gap-6 w-full h-screen'>
            <AddUserModal />
            <AddTaskModal />
            <Logout />
        </div>
        <div>
          <Idcard />
        </div>
      </>
    )
}

export default page