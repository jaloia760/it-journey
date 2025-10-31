"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

type Stage = {
  label: "Reactive" | "Proactive" | "Autonomous"
  summary: string
  media?: React.ReactNode
  bullets?: string[]
}

export default function StageTabs({ stages }: { stages: Stage[] }) {
  return (
    <Tabs defaultValue="Reactive" className="w-full">
      <TabsList className="grid w-full grid-cols-3 rounded-xl">
        {stages.map(s => <TabsTrigger key={s.label} value={s.label} className="font-medium">{s.label}</TabsTrigger>)}
      </TabsList>
      {stages.map(s => (
        <TabsContent key={s.label} value={s.label} className="mt-6">
          <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:0.2}}
            className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700">{s.summary}</p>
              {s.bullets && <ul className="mt-4">{s.bullets.map(b => <li key={b}>{b}</li>)}</ul>}
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {s.media ?? <div className="p-8 text-slate-400">Add media (iframe/image) here.</div>}
            </div>
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
