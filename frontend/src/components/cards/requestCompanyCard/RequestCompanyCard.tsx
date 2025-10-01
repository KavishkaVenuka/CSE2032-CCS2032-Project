"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Phone, Users, Globe } from "lucide-react"

export interface Company {
  id: string
  name: string
  location: string
  logo: string
  regNo: string
  email: string
  contact: string
  employees: number
  bio: string
  url: string
}

interface CompanyCardProps {
  company: Company
  onConfirm?: (company: Company) => void
  onDelete?: (company: Company) => void
}

export function CompanyCard({ company, onConfirm, onDelete }: CompanyCardProps) {
  return (
    <Card className="flex flex-col gap-4 p-6 bg-card hover:shadow-lg transition-shadow">
      {/* Header with Logo and Company Name */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
          <img
            src={company.logo || "/placeholder.svg"}
            alt={`${company.name} logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground leading-tight">{company.name}</h3>
          <p className="text-sm text-muted-foreground">{company.location}</p>
        </div>
      </div>

      {/* Company Details */}
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium text-foreground">Reg No: </span>
          <span className="text-muted-foreground">{company.regNo}</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <a href={`mailto:${company.email}`} className="text-primary hover:underline truncate">
            {company.email}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground">{company.contact}</span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground">No. of Employees: {company.employees.toLocaleString()}</span>
        </div>
      </div>

      {/* Bio */}
      <div className="flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          <span className="font-medium text-foreground">Bio: </span>
          {company.bio}
        </p>
      </div>

      {/* URL */}
      <div className="flex items-center gap-2 text-sm">
        <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <a
          href={company.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline truncate"
        >
          {company.url}
        </a>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button onClick={() => onConfirm?.(company)} className="flex-1 bg-success hover:bg-success/90 text-white">
          Confirm
        </Button>
        <Button onClick={() => onDelete?.(company)} variant="destructive" className="flex-1">
          Delete
        </Button>
      </div>
    </Card>
  )
}
