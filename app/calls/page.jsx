'use client';

import React from 'react';
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import CallInterface from "../../components/CallInterface";

export default function CallsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);
  
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  
  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold p-4">Video Calls</h1>
      <CallInterface />
    </div>
  );
}