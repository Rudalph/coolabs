import { db } from "../../../database/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET() {
  try {
    const tasksRef = collection(db, "tasks");

    // Query: Order by assignmentDate in descending order (latest first)
    const q = query(tasksRef, orderBy("dateOfAssignment", "desc"));
    const querySnapshot = await getDocs(q);

    let tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });

    console.log("All Tasks are Here: ",tasks)

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), { status: 500 });
  }
}
