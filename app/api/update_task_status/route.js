import { db } from "../../../database/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const { taskId, status } = await req.json();

    if (!taskId || !status) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Update the task document with the new status
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { status });

    return new Response(JSON.stringify({ 
      message: "Task status updated successfully", 
      taskId, 
      status 
    }), { status: 200 });
  } catch (error) {
    console.error("Error updating task status: ", error);
    return new Response(JSON.stringify({ error: "Failed to update task status" }), { status: 500 });
  }
}