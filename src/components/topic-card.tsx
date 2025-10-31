import React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

type Props = { slug: string; title: string; subtitle: string; tags?: string[] }

export default function TopicCard({ slug, title, subtitle, tags = [] }: Props) {
  return (
    <Link href={`/${slug}`} className="group">
      <Card className="h-full min-h-[200px] sm:min-h-[210px] rounded-2xl border-slate-200 transition-all group-hover:shadow-lg">
        <CardContent className="p-3 sm:p-4 lg:p-5">
          <div className="mb-3 flex items-start justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <ArrowRight className="mt-1 size-5 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
          </div>
          <p className="mb-2 line-clamp-3 text-sm text-slate-600">{subtitle}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((t, i) => (
              <React.Fragment key={`tag-${i}`}>
                <Badge variant="secondary" className="text-xs px-2.5 py-1 rounded-full bg-slate-100 font-medium">{t}</Badge>
                {i < tags.length - 1 && <span className="text-slate-400 text-xs px-1 relative top-1.5">→</span>}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
