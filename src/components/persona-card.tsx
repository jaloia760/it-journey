"use client";

import { personas, type PersonaStage, type PersonaContext } from "@/lib/persona";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";
import clsx from "clsx";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import BoringAvatar from "boring-avatars";

interface PersonaCardProps {
  stage: PersonaStage;
  context?: PersonaContext;
  className?: string;
}

const stageLabel: Record<PersonaStage, string> = {
  reactive: "Reactive persona",
  proactive: "Proactive persona",
  autonomous: "Autonomous persona",
};

const stageTone: Record<PersonaStage, string> = {
  reactive: "from-amber-50/60 to-white",
  proactive: "from-sky-50/60 to-white",
  autonomous: "from-violet-50/70 to-white",
};

export function PersonaCard({ stage, context = "incident", className }: PersonaCardProps) {
  const persona = personas[context]?.[stage];

  if (!persona) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={clsx(
            "relative overflow-hidden border border-slate-200/80 shadow-sm",
            "bg-linear-to-br",
            stageTone[stage],
            "px-3 py-2 flex flex-row items-center gap-3 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-transform max-w-xs",
            className,
          )}
        >
          <div className="shrink-0">
            <BoringAvatar size={40} name={persona.name} variant="beam" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="text-[13px] font-semibold text-slate-900 leading-tight">{persona.name}</div>
            <div className="text-xs leading-snug text-slate-600">{persona.title}</div>
            <Badge
              variant="outline"
              className="mt-1 text-[10px] py-0.5 px-2 border-slate-300 bg-white/70 backdrop-blur-sm text-slate-700 whitespace-nowrap"
            >
              {persona.roleEvolution}
            </Badge>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-md sm:max-w-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <DialogTitle className="flex items-center gap-3">
          <BoringAvatar size={48} name={persona.name} variant="beam" />
          <div>
            <div className="text-lg font-semibold text-slate-900">{persona.name}</div>
            <div className="text-sm text-slate-600">{persona.title}</div>
            <Badge
              variant="outline"
              className="mt-1 text-xs py-0.5 px-2 border-slate-300 bg-white/70 backdrop-blur-sm text-slate-700 whitespace-nowrap"
            >
              {persona.roleEvolution}
            </Badge>
          </div>
        </DialogTitle>
        <DialogDescription className="mt-4 text-sm text-slate-700 leading-relaxed">
          {persona.description}
        </DialogDescription>
        <div className="mt-4 flex flex-wrap gap-2">
          {persona.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
        {persona.quote && (
          <div className="mt-6 flex items-start gap-2 text-sm text-slate-600 italic">
            <Quote className="mt-px h-4 w-4 text-slate-400" />
            <span>“{persona.quote}”</span>
          </div>
        )}
        <DialogClose className="mt-6 inline-flex items-center justify-center rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-300">
          Close
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
