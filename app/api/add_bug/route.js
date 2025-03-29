import { db } from "../../../database/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const bugData = await req.json();

    const { ...bugDetails } = bugData;

    const docRef = await addDoc(collection(db, "bugs"), bugDetails);

    return new Response(JSON.stringify({ message: "Bug added successfully", id: docRef.id }), { status: 200 });
  } catch (error) {
    console.error("Error adding document: ", error);
    return new Response(JSON.stringify({ error: "Failed to add task" }), { status: 500 });
  }
}
