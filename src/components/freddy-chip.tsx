import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export default function FreddyChip() {
  return (
    <Badge
      className="rounded-full bg-indigo-600 hover:bg-indigo-600 text-white p-1"
      title="Freddy AI"
    >
      <Sparkles size={14} />
    </Badge>
  )
}