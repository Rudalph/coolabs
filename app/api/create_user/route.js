import { NextResponse } from "next/server";
import { auth } from "../../../database/firebase"; // Import initialized Firebase Auth
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password, adminPassword } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Optional admin password validation
    if (adminPassword) {
      // You could implement admin verification here
      // For example, check if adminPassword matches your secret admin key
      const ADMIN_SECRET = process.env.ADMIN_PASSWORD;
      if (adminPassword !== ADMIN_SECRET) {
        return NextResponse.json({ error: "Invalid admin credentials" }, { status: 403 });
      }
      // If admin verification passes, you could set admin claims later
    }

    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, username, password);
    const user = userCredential.user;
    
    // You could add additional user setup here if needed
    // For example, setting display name, adding to Firestore database, etc.
    
    return NextResponse.json(
      { 
        message: "User created successfully!", 
        user: {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating user:", error);
    
    // Handle specific Firebase auth errors
    if (error.code === 'auth/email-already-in-use') {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    } else if (error.code === 'auth/weak-password') {
      return NextResponse.json({ error: "Password is too weak" }, { status: 400 });
    } else if (error.code === 'auth/invalid-email') {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}