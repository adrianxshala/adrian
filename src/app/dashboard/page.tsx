"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  // Handle the case where authContext is null
  const user = authContext?.user;

  useEffect(() => {
    console.log("User in Dashboard:", user); // ✅ Debugging
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return <p>Loading...</p>;

  return <div className="p-5">Welcome, {user?.name || user?.username}!</div>;

}