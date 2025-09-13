"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface ProjectTabsProps {
  tabs: Tab[]
  defaultTab?: string
}

export function ProjectTabs({ tabs, defaultTab }: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-b-none ${
              activeTab === tab.id
                ? "bg-blue-500 text-white border-b-2 border-blue-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="min-h-[200px]">{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  )
}
