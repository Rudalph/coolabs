"use client"
import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../database/firebase"
import { 
  ListTodo, 
  MessagesSquare, 
  NotebookPen, 
  BugOff, 
  MessageSquare, 
  ChevronRight, 
  ChevronLeft,
  LogOut,
  Bell,
  Search,
  User
} from 'lucide-react';

import AllTasks from "@/components/AllTasks"
import ChatSection from "@/components/ChatSection"
import BugsTracker from "@/components/BugsTracker"
import AllNotices from './AllNotices';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";


const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('AllTasks');

  const context_auth = useAuth();
  const { user, loading } = context_auth;
  console.log(user)
  const router = useRouter();
  useEffect(() => {
          if (!loading && !user) {
            router.push("/"); 
          }
        }, [user, loading, router]);
      
  if (loading) return <p>Loading...</p>;

  const logout = () => {
      signOut(auth).then(() => {
        alert("Logged Out")
      }).catch((error) => {
        alert(error)
      });
  }
  

  const componentMap = {
    'AllTasks': <AllTasks />,
    'ChatSection': <ChatSection />,
    'BugsTracker': <BugsTracker />,
    'AllNotices': <AllNotices />,
    // 'Settings': <SettingsComponent />
  };


  const SidebarItem = ({ icon: Icon, text, active, onClick }) => (
    <div 
      className={`
        flex items-center 
        px-4 py-3 
        cursor-pointer 
        group 
        transition-all 
        duration-300 
        ${active 
          ? 'bg-gray-200 text-black' 
          : 'text-gray-700 hover:bg-gray-100'}
        rounded-lg 
        mx-2 
        my-1
      `}
      onClick={onClick}
    >
      <Icon 
        className={`
          w-6 h-6 
          transition-all 
          duration-300 
          ${active ? 'text-black' : 'text-gray-600 group-hover:text-black'}
        `} 
      />
      {isOpen && (
        <span 
          className={`
            ml-4 
            text-sm 
            font-medium 
            transition-all 
            duration-300 
            ${active ? 'text-black' : 'text-gray-800 group-hover:text-black'}
          `}
        >
          {text}
        </span>
      )}
    </div>
  );

  const Header = () => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      {isOpen ? (
        <div className="flex items-center">
          <div 
            className="
              w-10 h-10 
              bg-black 
              rounded-full 
              flex 
              items-center 
              justify-center 
              text-white 
              font-bold
            "
          >
            C
          </div>
          <span className="ml-3 text-lg font-semibold text-black">CooLabs</span>
        </div>
      ) : (
        <div 
          className="
            w-10 h-10 
            bg-black 
            rounded-full 
            flex 
            items-center 
            justify-center 
            text-white 
            font-bold
            mx-auto
          "
        >
          A
        </div>
      )}
    </div>
  );

  const SearchBar = () => (
    <div 
      className={`
        mx-2 my-4 
        transition-all 
        duration-300 
        ${isOpen ? 'px-2' : 'px-0'}
      `}
    >
      {isOpen ? (
        <div 
          className="
            flex 
            items-center 
            bg-gray-100 
            rounded-full 
            px-4 
            py-2 
            space-x-3
          "
        >
          <Search className="w-5 h-5 text-gray-600" />
          <input 
            type="text" 
            placeholder="Search" 
            className="
              bg-transparent 
              outline-none 
              text-sm 
              w-full 
              text-black
            " 
          />
        </div>
      ) : (
        <div 
          className="
            flex 
            items-center 
            justify-center 
            bg-gray-100 
            rounded-full 
            p-2 
            mx-auto
          "
        >
          <Search className="w-5 h-5 text-gray-600" />
        </div>
      )}
    </div>
  );

  if (!user) {
    return null;
}

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`
          bg-white 
          shadow-xl 
          border-r 
          border-gray-200 
          h-full 
          flex 
          flex-col 
          transition-all 
          duration-500 
          ease-in-out
          ${isOpen ? 'w-64' : 'w-20'}
          relative
        `}
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="
            absolute 
            top-4 
            -right-4 
            bg-white 
            border 
            border-gray-200 
            rounded-full 
            p-2 
            shadow-lg 
            hover:bg-gray-100 
            z-10
            transition-all
            duration-300
            hover:scale-105
          "
        >
          {isOpen ? <ChevronLeft className="text-black" /> : <ChevronRight className="text-black" />}
        </button>

        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <Header />

          {/* Search Bar */}
          <SearchBar />

          {/* Navigation */}
          <nav className="flex-grow px-2 overflow-y-auto">
            <SidebarItem 
              icon={ListTodo} 
              text="Task Board" 
              active={activeItem === 'AllTasks'}
              onClick={() => setActiveItem('AllTasks')}
            />
            <SidebarItem 
              icon={MessagesSquare} 
              text="Chat Room" 
              active={activeItem === 'ChatSection'}
              onClick={() => setActiveItem('ChatSection')}
            />
            <SidebarItem 
              icon={BugOff} 
              text="Track Bugs" 
              active={activeItem === 'BugsTracker'}
              onClick={() => setActiveItem('BugsTracker')}
            />
            {/* <SidebarItem 
              icon={MessageSquare} 
              text="Messages" 
              active={activeItem === 'Messages'}
              onClick={() => setActiveItem('Messages')}
            /> */}
            <SidebarItem 
              icon={NotebookPen} 
              text="Notice Board" 
              active={activeItem === 'AllNotices'}
              onClick={() => setActiveItem('AllNotices')}
            />
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            {isOpen ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-8 h-8 text-black bg-gray-100 p-1.5 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-black">{user.email.split('@')[0]}</p>
                    <p className="text-xs text-gray-600">Intern</p>
                  </div>
                </div>
                <LogOut onClick={() => logout()} className="w-5 h-5 text-gray-700 hover:text-black cursor-pointer" />
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <Bell className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer" />
                <LogOut onClick={() => logout()} className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer"/>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main 
        className={`
          flex-grow 
          bg-gray-50 
          transition-all 
          duration-500 
          ease-in-out
          
          overflow-y-auto
          p-6
        `}
      >
        {/* {children} */}
        {componentMap[activeItem]}
      </main>
    </div>
  );
};

export default Sidebar;