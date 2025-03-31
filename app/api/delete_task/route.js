import { db } from "../../../database/firebase";
import { doc, deleteDoc, getDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const { taskId } = await req.json();
    
    // Verify admin password
    // if (adminPassword !== process.env.ADMIN_PASSWORD) {
    //   return new Response(JSON.stringify({ message: "Unauthorized Access" }), { status: 403 });
    // }
    
    // Check if the task exists
    const taskRef = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(taskRef);
    
    if (!taskSnap.exists()) {
      return new Response(JSON.stringify({ message: "Task not found" }), { status: 404 });
    }
    
    // Delete the task
    await deleteDoc(taskRef);
    
    return new Response(JSON.stringify({ message: "Task deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting document: ", error);
    return new Response(JSON.stringify({ error: "Failed to delete task" }), { status: 500 });
  }
}