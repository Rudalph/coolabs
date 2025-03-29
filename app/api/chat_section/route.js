// import { 
//     collection, 
//     addDoc, 
//     query, 
//     orderBy, 
//     onSnapshot, 
//     serverTimestamp 
//   } from 'firebase/firestore';
//   import { db } from '../../../database/firebase'; // Assuming this is your existing firebase.js file
  
//   // Send message to Firestore
//   export const sendMessage = async (message, user) => {
//     try {
//       const chatRef = collection(db, 'messages');
//       await addDoc(chatRef, {
//         text: message,
//         user: user.email,
//         timestamp: serverTimestamp()
//       });
//     } catch (error) {
//       console.error('Error sending message:', error);
//       throw error;
//     }
//   };
  
//   // Fetch messages from Firestore
//   export const fetchMessages = (callback) => {
//     const chatRef = collection(db, 'messages');
//     const q = query(chatRef, orderBy('timestamp', 'asc'));
  
//     // Set up real-time listener
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const messages = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       callback(messages);
//     }, (error) => {
//       console.error('Error fetching messages:', error);
//     });
  
//     return unsubscribe;
//   };



// app/api/chat_section/route.js
import { NextResponse } from 'next/server';
import { db } from '../../../database/firebase'; // Adjust path to your firebase config
import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';

// Handle POST requests for sending messages
export async function POST(request) {
  try {
    // Parse the incoming request body
    const req = await request.json();
    const { message, userEmail } = req;

    // Validate input
    if (!message || !userEmail) {
      return NextResponse.json(
        { error: 'Message and user email are required' }, 
        { status: 400 }
      );
    }

    // Reference to messages collection
    const messagesRef = collection(db, 'messages');

    // Add message to Firestore
    const docRef = await addDoc(messagesRef, {
      text: message,
      user: userEmail,
      timestamp: serverTimestamp()
    });

    // Return success response
    return NextResponse.json(
      { 
        message: 'Message sent successfully', 
        id: docRef.id 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to send message' }, 
      { status: 500 }
    );
  }
}

// Handle GET requests
export async function GET() {
  // This route doesn't need to handle GET requests
  // since we're using onSnapshot in the client
  return NextResponse.json(
    { message: 'Use client-side listener for messages' }, 
    { status: 200 }
  );
}