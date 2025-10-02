import React from "react";
import StatCard from "./components/StatCard";
import ApplicationCard from "./components/ApplicationCard"; // ✅ renamed
import { AiOutlineUser, AiOutlineFileText } from "react-icons/ai";
import { FiEye, FiClock } from "react-icons/fi";
import CategoryCard from "./components/CategoryCard";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 gap-10">
      {/* --- Stats Section --- */}
      <div className="grid grid-cols-4 gap-6 w-full max-w-6xl">
        <StatCard
          title="Active Jobs"
          value={2}
          subtitle="Currently accepting applications"
          percentage="+12%"
          bgColor="bg-white"
          Icon={AiOutlineFileText}
        />
        <StatCard
          title="Total Applications"
          value={1}
          subtitle="Across all job postings"
          percentage="+8%"
          bgColor="bg-white"
          Icon={AiOutlineUser}
        />
        <StatCard
          title="Profile Views"
          value={1847}
          subtitle="Company page visits"
          percentage="+15%"
          bgColor="bg-white"
          Icon={FiEye}
        />
        <StatCard
          title="Avg Response Time"
          value="2.4h"
          subtitle="Time to respond to applications"
          percentage="-5%"
          bgColor="bg-white"
          Icon={FiClock}
        />
      </div>
      {/* --- Application Card Section --- */}
      <ApplicationCard
        name="Tharindu Dananjaya"
        email="thari@gmai.com"
        degree="BSc (Hons)"
        phone="undefined"
        location="undefined"
        appliedDate="Invalid Date"
      />

      {/* --- Category Card Section (Sample) --- */}
      <CategoryCard
        id={1}
        name="Education"
        description="Teaching, academic, and educational services"
      />
    </div>
  );
}


export default App;
