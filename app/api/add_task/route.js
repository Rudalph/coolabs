import { db } from "../../../database/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const taskData = await req.json();

    // Extract the password properly
    const { adminPassword, ...taskDetails } = taskData; 

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ message: "Unauthorized Access" }), { status: 403 });
    }

    const docRef = await addDoc(collection(db, "tasks"), taskDetails);

    return new Response(JSON.stringify({ message: "Task added successfully", id: docRef.id }), { status: 200 });
  } catch (error) {
    console.error("Error adding document: ", error);
    return new Response(JSON.stringify({ error: "Failed to add task" }), { status: 500 });
  }
}
