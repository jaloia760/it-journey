import type { Metadata } from "next"
import "./globals.css"
import TourProvider from "@/components/tour/TourProvider";

export const metadata: Metadata = {
  title: "IT Journey — Reactive → Proactive → Autonomous",
  description: "Freshservice story map & prototypes",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-linear-to-b from-slate-50 to-white text-slate-900 antialiased">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <TourProvider>
            {children}
          </TourProvider>
        </div>
      </body>
    </html>
  )
}
