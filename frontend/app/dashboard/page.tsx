"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use Next.js's useRouter for navigation
import FallAlert from "../components/FallAlert";
import MetricsCard from "../components/Metrics";

function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (!token) {
      // If no token is found, redirect the user to the sign-in page
      router.push("/signin");
    }
  }, [router]); // Adding router as a dependency to ensure the hook re-runs when the router changes

  return (
    <>
      <FallAlert />
      <MetricsCard />
    </>
  );
}

export default Dashboard;
