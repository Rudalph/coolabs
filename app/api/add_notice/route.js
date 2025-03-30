import { db } from "../../../database/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const noticeData = await req.json();

    // Extract the password properly
    const { adminPassword, ...noticeDetails } = noticeData; 

    // Check authorization
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ message: "Unauthorized Access" }), { status: 403 });
    }

    // Convert date strings to Firestore timestamps for better querying
    if (noticeDetails.publishDate) {
      noticeDetails.publishDate = Timestamp.fromDate(new Date(noticeDetails.publishDate));
    }
    
    if (noticeDetails.expiryDate) {
      noticeDetails.expiryDate = Timestamp.fromDate(new Date(noticeDetails.expiryDate));
    }

    // Add created timestamp
    noticeDetails.createdAt = Timestamp.now();

    // Add notice to "notices" collection instead of "tasks"
    const docRef = await addDoc(collection(db, "notices"), noticeDetails);

    return new Response(
      JSON.stringify({ 
        message: "Notice published successfully", 
        id: docRef.id 
      }), 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error publishing notice: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to publish notice" }), 
      { status: 500 }
    );
  }
}