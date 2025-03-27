import { NextResponse } from "next/server";
import { auth } from "../../../database/firebase"; // Import initialized Firebase Auth
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

   
    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    const current_user = auth.currentUser;
    console.log(current_user.email)
    return NextResponse.json(
      { message: "User signed in successfully!", user: userCredential.user },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error signing in user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
