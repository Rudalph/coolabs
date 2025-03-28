import { 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    onSnapshot, 
    serverTimestamp 
  } from 'firebase/firestore';
  import { db } from '../../../database/firebase'; // Assuming this is your existing firebase.js file
  
  // Send message to Firestore
  export const sendMessage = async (message, user) => {
    try {
      const chatRef = collection(db, 'messages');
      await addDoc(chatRef, {
        text: message,
        user: user.email,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };
  
  // Fetch messages from Firestore
  export const fetchMessages = (callback) => {
    const chatRef = collection(db, 'messages');
    const q = query(chatRef, orderBy('timestamp', 'asc'));
  
    // Set up real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(messages);
    }, (error) => {
      console.error('Error fetching messages:', error);
    });
  
    return unsubscribe;
  };