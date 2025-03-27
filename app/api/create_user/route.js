import { NextResponse } from "next/server";
import { auth } from "../../../database/firebase"; // Import initialized Firebase Auth
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password, adminPassword } = body;

    if (!username || !password || !adminPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, username, password);
    const current_user = auth.currentUser
    const currentUser_uid = current_user.uid
    console.log(current_user, currentUser_uid)
    return NextResponse.json(
      { message: "User saved successfully!", user: userCredential.user },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
