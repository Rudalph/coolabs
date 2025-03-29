import { db } from "../../../database/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET() {
  try {
    const bugsRef = collection(db, "bugs");

    // Query: Order by assignmentDate in descending order (latest first)
    const q = query(bugsRef, orderBy("dateAssigned", "desc"));
    const querySnapshot = await getDocs(q);

    let bugs = [];
    querySnapshot.forEach((doc) => {
      bugs.push({ id: doc.id, ...doc.data() });
    });

    console.log("All bugs are Here: ",bugs)

    return new Response(JSON.stringify(bugs), { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), { status: 500 });
  }
}
