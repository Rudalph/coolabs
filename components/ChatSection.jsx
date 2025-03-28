// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from "../context/AuthContext";
// import { useRouter } from 'next/navigation';
// import { sendMessage, fetchMessages } from '../app/api/chat_section/route';
// import { Send, MessageCircle } from 'lucide-react';

// const ChatSection = () => {
//   // Authentication Context
//   const auth = useAuth();
//   const { user, loading } = auth;
//   const router = useRouter();

//   // State Management
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom when messages update
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Fetch Messages Effect
//   useEffect(() => {
//     // Redirect if not authenticated
//     if (!loading && !user) {
//       router.push('/login');
//       return;
//     }

//     // Fetch messages
//     const unsubscribe = fetchMessages((fetchedMessages) => {
//       setMessages(fetchedMessages);
//     });

//     // Cleanup subscription
//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, [user, loading, router]);

//   // Auto-scroll on new messages
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Handle Message Submission
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
    
//     if (!newMessage.trim() || !user) return;

//     try {
//       await sendMessage(newMessage, user);
//       setNewMessage('');
//     } catch (error) {
//       console.error('Message send failed:', error);
//     }
//   };

//   // Prevent rendering if not authenticated
//   if (!user) return null;

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Chat Header */}
//       <div className="bg-white shadow-md p-4 flex items-center">
//         <MessageCircle className="mr-2 text-blue-600" />
//         <h2 className="text-xl font-semibold text-gray-800">
//           Chat Room
//         </h2>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-grow overflow-y-auto p-4 space-y-4">
//         {messages.map((msg) => (
//           <div 
//             key={msg.id} 
//             className={`flex flex-col ${
//               msg.user === user.email 
//                 ? 'items-end' 
//                 : 'items-start'
//             }`}
//           >
//             <div 
//               className={`max-w-[70%] px-4 py-2 rounded-lg ${
//                 msg.user === user.email 
//                   ? 'bg-blue-500 text-white' 
//                   : 'bg-gray-200 text-gray-800'
//               }`}
//             >
//               <div className="text-xs mb-1 opacity-75">
//                 {msg.user === user.email ? 'You' : msg.user}
//               </div>
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input */}
//       <form 
//         onSubmit={handleSendMessage} 
//         className="bg-white p-4 border-t flex items-center"
//       >
//         <input 
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button 
//           type="submit" 
//           className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition"
//         >
//           <Send className="h-5 w-5" />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatSection;

"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';
import { sendMessage, fetchMessages } from '../app/api/chat_section/route';
import { 
  Send, 
  MessageCircle, 
  User, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatComponent = () => {
  // Authentication Context
  const auth = useAuth();
  const { user, loading } = auth;
  const router = useRouter();

  // State Management
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch Messages Effect
  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    // Fetch messages
    const unsubscribe = fetchMessages((fetchedMessages) => {
      setMessages(fetchedMessages);
    });

    // Cleanup subscription
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, loading, router]);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle Message Submission
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user) return;

    try {
      await sendMessage(newMessage, user);
      setNewMessage('');
    } catch (error) {
      console.error('Message send failed:', error);
    }
  };

  // Prevent rendering if not authenticated
  if (!user) return null;

  return (
    <div className="flex flex-col h-[90vh] lg:max-w-4xl max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden lg:mt-5">
      {/* Chat Header */}
      <div className="bg-neutral-100 p-4 flex items-center justify-between border-b border-neutral-200">
        <div className="flex items-center space-x-3">
          <MessageCircle className="h-6 w-6 text-neutral-700" />
          <h2 className="text-lg font-semibold text-neutral-800">
            Chat Room
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-neutral-600" />
          <span className="text-sm text-neutral-700 truncate max-w-[150px]">
            {user.email}
          </span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-neutral-50">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex flex-col ${
                msg.user === user.email 
                  ? 'items-end' 
                  : 'items-start'
              }`}
            >
              <div 
                className={`max-w-[80%] px-3 py-2 rounded-lg shadow-sm ${
                  msg.user === user.email 
                    ? 'bg-neutral-800 text-white' 
                    : 'bg-white text-neutral-800 border border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs opacity-70 flex items-center">
                    {msg.user === user.email ? 'You' : msg.user.split('@')[0]}
                    {msg.user === user.email && <CheckCircle2 className="ml-1 h-3 w-3 text-blue-400" />}
                  </span>
                  {msg.timestamp && (
                    <Clock className="h-3 w-3 opacity-50" />
                  )}
                </div>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form 
        onSubmit={handleSendMessage} 
        className="bg-white p-3 border-t border-neutral-200 flex items-center space-x-2"
      >
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
        />
        <button 
          type="submit" 
          className="bg-neutral-800 text-white p-2 rounded-lg hover:bg-neutral-700 transition flex items-center"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;