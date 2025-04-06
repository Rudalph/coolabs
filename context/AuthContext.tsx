// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "@/database/firebase";
// import { onAuthStateChanged, User, setPersistence, browserLocalPersistence } from "firebase/auth";

// type AuthContextType = {
//   user: User | null;
//   loading: boolean;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAuth = async () => {
//       try {
//         console.log("Setting Firebase persistence...");
//         await setPersistence(auth, browserLocalPersistence);

//         const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//           console.log("Auth state changed: ", firebaseUser);
//           setUser(firebaseUser);
//           setLoading(false);
//         });

//         return () => unsubscribe();
//       } catch (error) {
//         console.error("Error setting persistence:", error);
//         setLoading(false);
//       }
//     };

//     fetchAuth();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/database/firebase";
import { 
  onAuthStateChanged, 
  User, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc, 
  serverTimestamp 
} from "firebase/firestore";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        console.log("Setting Firebase persistence...");
        await setPersistence(auth, browserLocalPersistence);

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          console.log("Auth state changed: ", firebaseUser);
          
          if (firebaseUser) {
            // User is signed in, update Firestore user document
            const userDocRef = doc(db, "users", firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
              // Update existing user document
              await updateDoc(userDocRef, {
                lastSeen: serverTimestamp(),
                isOnline: true,
              });
            } else {
              // Create new user document
              await setDoc(userDocRef, {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
                photoURL: firebaseUser.photoURL || null,
                createdAt: serverTimestamp(),
                lastSeen: serverTimestamp(),
                isOnline: true,
                incomingCall: null
              });
            }
          } else if (user) {
            // User is now signed out, but we previously had a user
            // Update their status in Firestore
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
              lastSeen: serverTimestamp(),
              isOnline: false,
            });
          }
          
          setUser(firebaseUser);
          setLoading(false);
        });

        return () => {
          // When component unmounts but user is still logged in, update online status
          if (auth.currentUser) {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            updateDoc(userDocRef, {
              isOnline: false,
              lastSeen: serverTimestamp()
            });
          }
          unsubscribe();
        };
      } catch (error) {
        console.error("Error setting persistence:", error);
        setLoading(false);
      }
    };

    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};