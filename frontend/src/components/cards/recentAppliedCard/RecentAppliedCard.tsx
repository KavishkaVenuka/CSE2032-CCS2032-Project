"use client"

import { Briefcase, Send, Building2 } from "lucide-react"
import { StatCard } from "./stat-card"

// Sample JSON data structure - replace with API call later
const statsData = [
  {
    id: 1,
    title: "Applications Submitted",
    value: 24,
    icon: Briefcase,
    iconColor: "text-indigo-600",
    iconBgColor: "bg-indigo-50",
  },
  {
    id: 2,
    title: "Selected for interview",
    value: 8,
    icon: Send,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-50",
  },
  {
    id: 3,
    title: "Companies you follow",
    value: 12,
    icon: Building2,
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-50",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statsData.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconColor={stat.iconColor}
          iconBgColor={stat.iconBgColor}
        />
      ))}
    </div>
  )
}
