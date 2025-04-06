import { NextResponse } from 'next/server';
import { db } from "../../../database/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export async function POST(request) {
  try {
    const { pushToken } = await request.json();
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Update user document with push token
    await updateDoc(doc(db, 'users', user.uid), {
      pushToken: pushToken
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error registering push token:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}