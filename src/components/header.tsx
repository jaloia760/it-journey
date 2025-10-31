"use client"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Sparkles, LineChart, Workflow } from "lucide-react"

export default function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-2xl bg-purple-700 text-white grid place-items-center shadow">
    <Sparkles size={18} />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">IT Evolution</h1>
          <p className="text-sm text-slate-500">Reactive → Proactive → Autonomous</p>
        </div>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem className="text-slate-600 hover:text-slate-900">Overview</NavigationMenuItem>
          <NavigationMenuItem className="text-slate-600 hover:text-slate-900 flex items-center gap-1">
            <LineChart size={16}/> Insights
          </NavigationMenuItem>
          <NavigationMenuItem className="text-slate-600 hover:text-slate-900 flex items-center gap-1">
            <Workflow size={16}/> Workflows
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
